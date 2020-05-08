import { Injectable } from '@nestjs/common';
import { Room, PokerPlayer } from '@planning-poker/shared';

@Injectable()
export class RoomService {

    private rooms: Room[] = [];

    getAllRooms() {
        return this.rooms;       
    }

    getRoom(roomName: string): Room {
        return this.rooms.find(room => room.name === roomName);
    }

    addRoom(newRoom: Room) {
        this.rooms.push(newRoom);
    }

    removeRoom(roomIdToRemove: string) {
        this.rooms = this.rooms.filter(r => r.id !== roomIdToRemove);
    }

    roomExists(room: string) {
        return this.rooms.filter(r => r.name === room).length > 0;
    }

    setRoomPlayer(pokerPlayer: PokerPlayer, roomName: string) {
        if (this.roomExists(roomName)) {
            this.rooms.find(room => room.name === roomName).players.push(pokerPlayer);
        }
    }

    /**
     * @toBeRefactored
     * @param playerId 
     */
    removePlayerFromRoom(playerId: string, roomName: string) {
        let playerLeft: PokerPlayer = {} as PokerPlayer;
        if (this.roomExists(roomName)) {
            const room = this.rooms.find(room => room.name === roomName);
            room.players = room.players.filter(m => {
                if (m.id === playerId) {
                    playerLeft = m; 
                }
                return m.id !== playerId
            });
        }
        return playerLeft;
    }

}
