import { WebSocketReducerState, WebSocketActionTypes } from 'app/redux/webSocket/types';
import { Reducer } from 'redux';

const INITIAL_STATE: WebSocketReducerState = {
    joiningRoom: false,
    creatingRoom: false,
    isConnectedToRoom: false,
    loggedPlayer: {
        id: '',
        name: '',
        isAdmin: false,
    },
    room: {
        id: '',
        name: '',
        players: [],
    },
};

const reducer: Reducer<WebSocketReducerState> = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {

        // CREATE ROOM
        case WebSocketActionTypes.CREATE_ROOM_REQUEST:
            return {
                ...state,
                creatingRoom: true,
            };

        case WebSocketActionTypes.CREATE_ROOM_SUCCESS:
            return {
                ...state,
                creatingRoom: false,
            };

        case WebSocketActionTypes.CREATE_ROOM_FAILURE:
            return {
                ...state,
                creatingRoom: false,
            };

        // ROOM ACCESS
        case WebSocketActionTypes.JOIN_ROOM_REQUEST:
            return {
                ...state,
                joiningRoom: true,
            };

        case WebSocketActionTypes.JOIN_ROOM_FAILURE:
            return {
                ...state,
                joiningRoom: false,
            };

        case WebSocketActionTypes.JOIN_ROOM_SUCCESS:
            return {
                ...state,
                joiningRoom: false,
                isConnectedToRoom: true,
                loggedPlayer: payload.player,
                room: payload.currentRoomState,
            };

        case WebSocketActionTypes.NEW_PLAYER:
            return {
                ...state,
                room: {
                    ...state.room,
                    players: payload.players,
                },
            };

        case WebSocketActionTypes.PLAYER_LEFT:
            return {
                ...state,
                room: {
                    ...state.room,
                    players: payload.players,
                },
            };

        default:
            return state;

    }

};

export default reducer;
