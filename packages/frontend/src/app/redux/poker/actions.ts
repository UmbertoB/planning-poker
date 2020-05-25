import { action } from 'typesafe-actions';
import { PokerActionTypes } from 'app/redux/poker/types';
import {
    SetTaskDescriptionPayload,
    TaskDescriptionUpdatedPayload,
    SelectCardValuePayload,
    CardValueSelectedPayload,
    StartPokerPayload,
} from '@planning-poker/shared';

export const startPokerRequest = (payload: StartPokerPayload) => action(PokerActionTypes.START_POKER_REQUEST, payload);
export const startPokerSuccess = () => action(PokerActionTypes.START_POKER_SUCCESS);
export const startPokerFailure = () => action(PokerActionTypes.START_POKER_FAILURE);

export const stopPokerNotEnoughPlayers = () => action(PokerActionTypes.STOP_POKER_NOT_ENOUGH_PLAYERS);

export const setTaskDescriptionRequest = (payload: SetTaskDescriptionPayload) => action(PokerActionTypes.SET_TASK_DESCRIPTION_REQUEST, payload);
export const setTaskDescriptionSuccess = (payload: TaskDescriptionUpdatedPayload) => action(PokerActionTypes.SET_TASK_DESCRIPTION_SUCCESS, payload);
export const setTaskDescriptionFailure = () => action(PokerActionTypes.SET_TASK_DESCRIPTION_FAILURE);

export const selectCardValueRequest = (payload: SelectCardValuePayload) => action(PokerActionTypes.SELECT_CARD_VALUE_REQUEST, payload);
export const selectCardValueSuccess = (payload: CardValueSelectedPayload) => action(PokerActionTypes.SELECT_CARD_VALUE_SUCCESS, payload);
export const selectCardValueFailure = () => action(PokerActionTypes.SELECT_CARD_VALUE_FAILURE);
export const otherPlayerCardValue = (payload: CardValueSelectedPayload) => action(PokerActionTypes.OTHER_PLAYERS_CARD_VALUES, payload);

export const restartPokerRequest = (roomName: string) => action(PokerActionTypes.RESTART_POKER_REQUEST, roomName);
export const restartPokerSuccess = () => action(PokerActionTypes.RESTART_POKER_SUCCESS);
