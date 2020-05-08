import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RoomService } from 'src/service/room.service';
import {
  RoomEvents,
  PokerPlayer,
  JoinRoomPayload,
  LeaveRoomPayload,
  PlayerLeftPayload,
  NewPlayerPayload,
  JoinedRoomPayload,
  StartPokerPayload,
} from '@planning-poker/shared';

@WebSocketGateway()
export class RoomGateway {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('RoomGateway');

  constructor(private rs: RoomService) { }

  @SubscribeMessage(RoomEvents.JOIN_ROOM)
  joinRoom(client: Socket, payload: JoinRoomPayload) {
    const room = this.rs.getRoom(payload.room);
    if (room && !room.pokerInProgress) {

      const newPlayer: PokerPlayer = { id: client.id, name: payload.name, isAdmin: payload.isAdmin };

      client.join(payload.room);
      this.rs.setRoomPlayer(newPlayer, payload.room);

      const currentRoomState = this.rs.getRoom(payload.room);
      // refactor this
      const PAYLOAD: NewPlayerPayload | JoinedRoomPayload = {
        currentRoomState,
        newPlayer,
      }

      client.emit(RoomEvents.JOINED_ROOM, PAYLOAD);
      client.to(payload.room).emit(RoomEvents.NEW_PLAYER, PAYLOAD);

      this.logger.log(`${payload.name} joined Room ${payload.room}`);

    } else {
      const room = this.rs.getRoom(payload.room);
      room && room.pokerInProgress
        ? client.emit(RoomEvents.CANT_JOIN_ALREADY_STARTED_POKER)
        : client.emit(RoomEvents.CANT_JOIN_INEXISTENT_ROOM)
    }
  }

  @SubscribeMessage(RoomEvents.LEAVE_ROOM)
  leaveRoom(client: Socket, payload: LeaveRoomPayload) {
    // if (this.rs.roomExists(payload.room)) @ERROR.1 {

    const currentRoomState = this.rs.getRoom(payload.room);
    const playerLeft = this.rs.removePlayerFromRoom(client.id, payload.room);

    const playerLeftPayload: PlayerLeftPayload = {
      currentRoomState,
      playerLeft,
    }

    client.leave(payload.room);

    if (playerLeft.isAdmin) {
      this.rs.removeRoom(currentRoomState.id)
      client.to(payload.room).emit(RoomEvents.ADMIN_LEFT, playerLeftPayload)
    } else {
      client.to(payload.room).emit(RoomEvents.PLAYER_LEFT, playerLeftPayload)
    }
    client.emit(RoomEvents.LEFT_ROOM);

    this.logger.log(`${client.id} left Room ${payload.room}`)

    // } else {
    //   client.emit(RoomEvents.CANT_LEAVE_INEXISTENT_ROOM);
    // }

  }

  @SubscribeMessage(RoomEvents.START_POKER)
  startPokerRoom(client: Socket, payload: StartPokerPayload) {
    if (this.rs.roomExists(payload.roomName)) {

      const currentRoomState = this.rs.getRoom(payload.roomName);

      currentRoomState.pokerInProgress = true;

      this.wss.in(payload.roomName).emit(RoomEvents.POKER_STARTED);

      this.logger.log(`${payload.roomName} poker has been started!`);

    } else {
      client.emit(RoomEvents.CANT_START_POKER_OF_INEXISTENT_ROOM);
    }

  }

}
