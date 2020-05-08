import { PlayerCard } from '@planning-poker/shared';

/**
 * Action types
 */
export enum PokerActionTypes {
    SET_TASK_DESCRIPTION_REQUEST = 'SET_TASK_DESCRIPTION_REQUEST',
    SET_TASK_DESCRIPTION_SUCCESS = 'SET_TASK_DESCRIPTION_SUCCESS',
    SET_TASK_DESCRIPTION_FAILURE = 'SET_TASK_DESCRIPTION_FAILURE',

    SELECT_CARD_VALUE_REQUEST = 'SELECT_CARD_VALUE_REQUEST',
    SELECT_CARD_VALUE_SUCCESS = 'SELECT_CARD_VALUE_SUCCESS',
    SELECT_CARD_VALUE_FAILURE = 'SELECT_CARD_VALUE_FAILURE',
    OTHER_PLAYERS_CARD_VALUES = 'OTHER_PLAYERS_CARD_VALUES',

    RESTART_POKER_REQUEST = 'RESTART_POKER_REQUEST',
    RESTART_POKER_SUCCESS = 'RESTART_POKER_SUCCESS',
}

/**
 * Reducer state interface
 */
export interface PokerReducerState {
    currentTaskDescription: string
    cardValueSelected: boolean
    cardValuesSelected: PlayerCard[]
    playerDeck: number[]
}
