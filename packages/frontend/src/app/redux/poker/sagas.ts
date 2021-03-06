/* eslint-disable func-names */
import {
    fork,
    takeEvery,
    put,
} from 'redux-saga/effects';
import eventListener from 'app/redux/eventListener';
import eventEmitter from 'app/redux/eventEmitter';
import { PokerActionTypes } from 'app/redux/poker/types';
import {
    setTaskDescriptionSuccess,
    setTaskDescriptionFailure,
    selectCardValueSuccess,
    selectCardValueFailure,
    otherPlayerCardValue,
    restartPokerSuccess,
} from 'app/redux/poker/actions';
import {
    Action,
    RoomEvents,
    SetTaskDescriptionPayload,
    TaskDescriptionUpdatedPayload,
    SelectCardValuePayload,
    CardValueSelectedPayload,
} from '@planning-poker/shared';

export function* setTaskDescription(client: SocketIOClient.Socket) {

    yield takeEvery(PokerActionTypes.SET_TASK_DESCRIPTION_REQUEST, function* (action: Action<string, SetTaskDescriptionPayload>) {
        yield fork(eventEmitter, client, RoomEvents.SET_TASK_DESCRIPTION, action.payload);
    });

    yield fork(eventListener, client, RoomEvents.TASK_DESCRIPTION_UPDATED, function* (payload: TaskDescriptionUpdatedPayload) {
        yield put(setTaskDescriptionSuccess(payload));
    });

    yield fork(eventListener, client, RoomEvents.CANT_SET_TASK_FOR_INEXISTENT_ROOM, function* () {
        yield put(setTaskDescriptionFailure());
    });

}

export function* cardValuesSelected(client: SocketIOClient.Socket) {

    yield takeEvery(PokerActionTypes.SELECT_CARD_VALUE_REQUEST, function* (action: Action<string, SelectCardValuePayload>) {
        yield fork(eventEmitter, client, RoomEvents.SELECT_CARD_VALUE, action.payload);
    });

    yield fork(eventListener, client, RoomEvents.CARD_VALUE_SELECTED, function* (payload: CardValueSelectedPayload) {
        yield put(selectCardValueSuccess(payload));
    });

    yield fork(eventListener, client, RoomEvents.OTHER_PLAYERS_CARD_VALUE, function* (payload: CardValueSelectedPayload) {
        yield put(otherPlayerCardValue(payload));
    });

    yield fork(eventListener, client, RoomEvents.CANT_SELECT_CARD_VALUE_FOR_INEXISTENT_ROOM, function* () {
        yield put(selectCardValueFailure());
    });
}

export function* restartPoker(client: SocketIOClient.Socket) {

    yield takeEvery(PokerActionTypes.RESTART_POKER_REQUEST, function* (action: Action<string, string>) {
        yield fork(eventEmitter, client, RoomEvents.RESTART_POKER_REQUEST, action.payload);
    });

    yield fork(eventListener, client, RoomEvents.RESTART_POKER_SUCCESS, function* () {
        yield put(restartPokerSuccess());
    });

}
