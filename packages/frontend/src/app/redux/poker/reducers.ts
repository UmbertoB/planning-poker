import { Reducer } from 'redux';
import { PokerReducerState, PokerActionTypes } from 'app/redux/poker/types';
import { WebSocketActionTypes } from '../webSocket/types';

const INITIAL_STATE: PokerReducerState = {
    roomId: '',
    pokerInProgress: false,
    currentTaskDescription: '',
    cardValueSelected: false,
    playerDeck: [1, 2, 3, 5, 8, 13],
    cardValuesSelected: [],
};

const reducer: Reducer<PokerReducerState> = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {

        case WebSocketActionTypes.JOIN_ROOM_SUCCESS:
            return {
                ...payload.currentPokerState
            };

        // START POKER
        case PokerActionTypes.START_POKER_SUCCESS:
            return {
                ...state,
                pokerInProgress: true,
            };

        case PokerActionTypes.START_POKER_FAILURE:
            return {
                ...state,
                pokerInProgress: false,
            };

        // TASK DESCRIPTION
        case PokerActionTypes.SET_TASK_DESCRIPTION_SUCCESS:
            return {
                ...state,
                currentTaskDescription: payload.taskDescriptionUpdated,
            };

        case PokerActionTypes.SET_TASK_DESCRIPTION_FAILURE:
            return {
                ...state,
                currentTaskDescription: '',
            };

        // SELECT CARD VALUE
        case PokerActionTypes.SELECT_CARD_VALUE_SUCCESS:
            return {
                ...state,
                cardValueSelected: true,
                cardValuesSelected: [...state.cardValuesSelected, payload],
                playerDeck: state.playerDeck.filter((c) => c !== payload.cardValue),
            };

        case PokerActionTypes.OTHER_PLAYERS_CARD_VALUES:
            return {
                ...state,
                cardValuesSelected: [...state.cardValuesSelected, payload],
            };

        // RESET POKER
        case PokerActionTypes.RESTART_POKER_SUCCESS:
            return {
                ...INITIAL_STATE,
                pokerInProgress: true,
            };

        // STOP POKER
        case PokerActionTypes.STOP_POKER_NOT_ENOUGH_PLAYERS:
            return {
                ...state,
                pokerInProgress: false,
                currentTaskDescription: '',
                cardValueSelected: false,
                playerDeck: [1, 2, 3, 5, 8, 13],
                cardValuesSelected: [],
            };

        default:
            return state;

    }

};

export default reducer;
