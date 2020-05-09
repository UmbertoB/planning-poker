/**
 * Room events
 */
export enum RoomEvents {
    JOIN_ROOM = 'JOIN_ROOM',
    JOINED_ROOM = 'JOINED_ROOM',
    NEW_PLAYER = 'NEW_PLAYER',
    CANT_JOIN_INEXISTENT_ROOM = 'CANT_JOIN_INEXISTENT_ROOM',

    LEAVE_ROOM = 'LEAVE_ROOM',
    LEFT_ROOM = 'LEFT_ROOM',
    PLAYER_LEFT = 'PLAYER_LEFT',
    ADMIN_LEFT = 'ADMIN_LEFT',
    CANT_LEAVE_INEXISTENT_ROOM = 'CANT_LEAVE_INEXISTENT_ROOM',

    START_POKER = 'START_POKER',
    POKER_STARTED = 'POKER_STARTED',

    SET_TASK_DESCRIPTION = 'SET_TASK_DESCRIPTION',
    TASK_DESCRIPTION_UPDATED = 'TASK_DESCRIPTION_UPDATED',

    SELECT_CARD_VALUE = 'SELECT_CARD_VALUE',
    CARD_VALUE_SELECTED = 'CARD_VALUE_SELECTED',
    OTHER_PLAYERS_CARD_VALUE = 'OTHER_PLAYERS_CARD_VALUE',

    RESTART_POKER_REQUEST = 'RESTART_POKER_REQUEST',
    RESTART_POKER_SUCCESS = 'RESTART_POKER_SUCCESS',

    CANT_JOIN_ALREADY_STARTED_POKER = 'CANT_JOIN_ALREADY_STARTED_POKER',
    CANT_START_POKER_OF_INEXISTENT_ROOM = 'CANT_START_POKER_OF_INEXISTENT_ROOM',
    CANT_SET_TASK_FOR_INEXISTENT_ROOM = 'CANT_SET_TASK_FOR_INEXISTENT_ROOM',
    CANT_SELECT_CARD_VALUE_FOR_INEXISTENT_ROOM = 'CANT_SELECT_CARD_VALUE_FOR_INEXISTENT_ROOM',
}
