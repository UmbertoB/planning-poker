import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RoomService } from 'src/service/room.service';
import { PokerService } from 'src/service/poker.service';
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

  constructor(private rs: RoomService, private ps: PokerService) { }

  @SubscribeMessage(RoomEvents.JOIN_ROOM)
  joinRoom(client: Socket, payload: JoinRoomPayload) {
    const room = this.rs.getRoom(payload.room);
    if (room && !this.ps.isRoomPokerInProgress(room.id)) {

      const newPlayer: PokerPlayer = { id: client.id, name: payload.name, isAdmin: payload.isAdmin };

      client.join(payload.room);
      this.rs.setRoomPlayer(newPlayer, payload.room);

      const currentRoomState = this.rs.getRoom(payload.room);
      const currentPokerState = this.ps.getPokerSession(room.id);

      // payloads
      const joinedRoomPayload: JoinedRoomPayload = {
        currentRoomState,
        currentPokerState,
        player: newPlayer,
      }
      const newPlayerPayload: NewPlayerPayload = {
        currentRoomState,
        newPlayer,
      }
      // ------

      client.emit(RoomEvents.JOINED_ROOM, joinedRoomPayload);
      client.to(payload.room).emit(RoomEvents.NEW_PLAYER, newPlayerPayload);

      this.logger.log(`${payload.name} joined Room ${payload.room}`);

    } else {
      const room = this.rs.getRoom(payload.room);
      room && this.ps.isRoomPokerInProgress(room.id)
        ? client.emit(RoomEvents.CANT_JOIN_ALREADY_STARTED_POKER)
        : client.emit(RoomEvents.CANT_JOIN_INEXISTENT_ROOM)
    }
  }

  @SubscribeMessage(RoomEvents.LEAVE_ROOM)
  leaveRoom(client: Socket, payload: LeaveRoomPayload) {
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

    if (currentRoomState && currentRoomState.players.length <= 1 && this.ps.isRoomPokerInProgress(currentRoomState.id)) {
      this.ps.stopRoomPoker(currentRoomState.id);
      client.to(payload.room).emit(RoomEvents.STOP_POKER_NOT_ENOUGH_PLAYERS);
    }

    this.logger.log(`${client.id} left Room ${payload.room}`)

  }

}
