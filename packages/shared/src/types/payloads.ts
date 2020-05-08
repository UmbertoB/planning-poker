import { Room, PokerPlayer } from './room';

// create room
export interface CreateRoomPayload {
    playerAdminName: string
    roomName: string
}

// player join/leave
export interface JoinRoomPayload {
    name: string
    room: string
    isAdmin: boolean
}

export interface JoinedRoomPayload {
    player: PokerPlayer
    currentRoomState: Room
}

export interface LeaveRoomPayload {
    room: string
}

export interface PlayerLeftPayload {
    currentRoomState: Room
    playerLeft: PokerPlayer
}

export interface NewPlayerPayload {
    currentRoomState: Room
    newPlayer: PokerPlayer
}

// poker start
export interface StartPokerPayload {
    roomName: string
}

// task description
export interface SetTaskDescriptionPayload {
    roomName: string
    taskDescription: string
}

export interface TaskDescriptionUpdatedPayload {
    taskDescriptionUpdated: string
}

// select card value
export interface SelectCardValuePayload {
    playerName: string
    roomName: string
    cardValue: number
}

export interface CardValueSelectedPayload {
    playerName: string
    cardValue: number
}
