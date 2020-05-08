import { Reducer } from 'redux';
import { PokerReducerState, PokerActionTypes } from 'app/redux/poker/types';

const INITIAL_STATE: PokerReducerState = {
    currentTaskDescription: '',
    cardValueSelected: false,
    playerDeck: [1, 2, 3, 5, 8, 13],
    cardValuesSelected: [],
};

const reducer: Reducer<PokerReducerState> = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {

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
            return INITIAL_STATE;

        default:
            return state;

    }

};

export default reducer;
