import { PokerPlayer, Room } from '@planning-poker/shared';

/**
 * Action types
 */
export enum WebSocketActionTypes {
    JOIN_ROOM_REQUEST = 'JOIN_ROOM_REQUEST',
    JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS',
    JOIN_ROOM_FAILURE = 'JOIN_ROOM_FAILURE',
    NEW_PLAYER = 'NEW_PLAYER',

    LEAVE_ROOM_REQUEST = 'LEAVE_ROOM_REQUEST',
    LEAVE_ROOM_SUCCESS = 'LEAVE_ROOM_SUCCESS',
    LEAVE_ROOM_FAILURE = 'LEAVE_ROOM_FAILURE',
    PLAYER_LEFT = 'PLAYER_LEFT',

    CREATE_ROOM_REQUEST = 'CREATE_ROOM_REQUEST',
    CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS',
    CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE',
}

/**
 * Reducer state interface
 */
export interface WebSocketReducerState {
    joiningRoom: boolean
    creatingRoom: boolean
    isConnectedToRoom: boolean
    loggedPlayer: PokerPlayer
    room: Room
}
