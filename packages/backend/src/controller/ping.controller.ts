import { Controller, Get, Logger, Res} from '@nestjs/common';
import { RoomService } from '../service/room.service';
import { Response } from 'express';

@Controller('ping')
export class PingController {

    private logger: Logger = new Logger('PING');

    constructor(private readonly rs: RoomService) { }

    @Get()
    create(@Res() res: Response): void {
        this.logger.warn('PONG');
        res.json('PONG');
    }
    

}
