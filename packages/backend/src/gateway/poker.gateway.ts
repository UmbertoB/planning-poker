import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { RoomService } from 'src/service/room.service';
import { 
  SetTaskDescriptionPayload, SelectCardValuePayload, CardValueSelectedPayload, RoomEvents
} from '@planning-poker/shared';

@WebSocketGateway()
export class PokerGateway {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('PokerGateway');

  constructor(private rs: RoomService) { }

  @SubscribeMessage(RoomEvents.SET_TASK_DESCRIPTION)
  setTaskDescription(client: Socket, payload: SetTaskDescriptionPayload) {
    if (this.rs.roomExists(payload.roomName)) {
      
      this.wss.in(payload.roomName).emit(RoomEvents.TASK_DESCRIPTION_UPDATED, { taskDescriptionUpdated: payload.taskDescription });

    } else {
      client.emit(RoomEvents.CANT_SET_TASK_FOR_INEXISTENT_ROOM);
    }

  }

  @SubscribeMessage(RoomEvents.SELECT_CARD_VALUE)
  selectCardValue(client: Socket, payload: SelectCardValuePayload) {
    if (this.rs.roomExists(payload.roomName)) {

      const cardValueSelectedPayload: CardValueSelectedPayload = {
        playerName: payload.playerName,
        cardValue: payload.cardValue,
      }

      client.to(payload.roomName).emit(RoomEvents.OTHER_PLAYERS_CARD_VALUE, cardValueSelectedPayload);
      client.emit(RoomEvents.CARD_VALUE_SELECTED, cardValueSelectedPayload)
      
      this.logger.warn(`${payload.playerName} selected value ${payload.cardValue} in Poker Room ${payload.roomName}`)

    } else {
      client.emit(RoomEvents.CANT_SET_TASK_FOR_INEXISTENT_ROOM);
    }

  }

  @SubscribeMessage(RoomEvents.RESTART_POKER_REQUEST)
  restartPoker(client: Socket, roomName: string) {
    if (this.rs.roomExists(roomName)) {

      this.wss.in(roomName).emit(RoomEvents.RESTART_POKER_SUCCESS);
      
      this.logger.warn(`Poker in ${roomName} was restarted`);

    }

  }


}
