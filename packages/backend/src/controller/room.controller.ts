import { Controller, Post, Logger, Body, Res, HttpStatus } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Room, CreateRoomPayload, PokerSession } from '@planning-poker/shared';
import idGenerator from 'src/utils/functions/idGenerator';
import { Response } from 'express';
import { PokerService } from 'src/service/poker.service';

@Controller('room')
export class RoomController {

    private logger: Logger = new Logger('RoomController');

    constructor(private readonly rs: RoomService, private ps: PokerService) { }

    @Post()
    create(@Body() body: CreateRoomPayload, @Res() res: Response): void {
        if (!this.rs.roomExists(body.roomName)) {
            const newRoom: Room = { 
                id: idGenerator(), 
                name: body.roomName,
                players: [],
            };
            const newPokerSession: PokerSession = {
                roomId: newRoom.id,
                pokerInProgress: false,
                currentTaskDescription: '',
                cardValueSelected: false,
                playerDeck: [1, 2, 3, 5, 8, 13],
                cardValuesSelected: [],
            };
    
            this.rs.addRoom(newRoom);
            this.ps.addPokerSession(newPokerSession);
    
            res.status(HttpStatus.CREATED).send(newRoom);

        } else {
            res.status(HttpStatus.CONFLICT).send({ error: true, message: 'room__room_already_exists' });
        }
    }
    

}
