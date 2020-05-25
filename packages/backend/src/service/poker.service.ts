import { Injectable } from '@nestjs/common';
import { PokerSession } from '@planning-poker/shared';

@Injectable()
export class PokerService {

    private pokers: PokerSession[] = [];

    getPokerSession(roomId: string): PokerSession {
        return this.pokers.find(poker => poker.roomId === roomId);
    }

    isRoomPokerInProgress(roomId: string) {
        const poker = this.pokers.find(poker => poker.roomId === roomId);
        return poker ? poker.pokerInProgress : false;
    }

    startRoomPoker(roomId: string) {
        const poker = this.pokers.find(poker => poker.roomId === roomId);
        poker.pokerInProgress = true;   
    }

    stopRoomPoker(roomId: string) {
        const poker = this.pokers.find(poker => poker.roomId === roomId);
        poker.pokerInProgress = false;   
    }

    addPokerSession(newPokerSession: PokerSession) {
        this.pokers.push(newPokerSession);
    }

}
