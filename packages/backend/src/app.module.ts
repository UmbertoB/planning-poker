import { Module } from '@nestjs/common';
import { AppGateway } from 'src/gateway/app.gateway';
import { RoomController } from 'src/controller/room.controller';
import { PingController } from 'src/controller/ping.controller';
import { RoomService } from 'src/service/room.service';
import { PokerGateway } from 'src/gateway/poker.gateway';
import { RoomGateway } from 'src/gateway/room.gateway';

@Module({
  imports: [],
  controllers: [RoomController, PingController],
  providers: [
    AppGateway,
    PokerGateway,
    RoomGateway, 
    RoomService
  ],
})
export class AppModule {}
