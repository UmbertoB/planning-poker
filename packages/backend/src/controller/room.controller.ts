import { Controller, Post, Logger, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Room, CreateRoomPayload } from '@planning-poker/shared';
import idGenerator from 'src/utils/functions/idGenerator';
import { Response } from 'express';

@Controller('room')
export class RoomController {

    private logger: Logger = new Logger('RoomController');

    constructor(private readonly rs: RoomService) { }

    @Post()
    create(@Body() body: CreateRoomPayload, @Res() res: Response): void {
        if (!this.rs.roomExists(body.roomName)) {
            const newRoom: Room = { 
                id: idGenerator(), 
                name: body.roomName,
                players: [],
                pokerInProgress: false,
            };
    
            this.rs.addRoom(newRoom);
    
            res.status(HttpStatus.CREATED).send(newRoom);

        } else {
            res.status(HttpStatus.CONFLICT).send({ error: true, message: 'room__room_already_exists' });
        }
    }
    

}
