/* eslint-disable func-names */
import {
    call,
    fork,
    takeEvery,
    put,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import eventListener from 'app/redux/eventListener';
import eventEmitter from 'app/redux/eventEmitter';
import { WebSocketActionTypes } from 'app/redux/webSocket/types';
import {
    joinRoomRequest,
    joinRoomFailure,
    joinRoomSuccess,
    leaveRoomSuccess,
    leaveRoomFailure,
    createRoomSuccess,
    createRoomFailure,
    newPlayer,
    playerLeft,
} from 'app/redux/webSocket/actions';
import {
    Action,
    JoinRoomPayload,
    LeaveRoomPayload,
    PlayerLeftPayload,
    NewPlayerPayload,
    JoinedRoomPayload,
    CreateRoomPayload,
    RoomEvents,
} from '@planning-poker/shared';
import { createRoom } from 'app/services/room';


export function* joinRoomSaga({ client }: { client: SocketIOClient.Socket }) {

    yield takeEvery(WebSocketActionTypes.JOIN_ROOM_REQUEST, function* (action: Action<string, JoinRoomPayload>) {
        yield fork(eventEmitter, client, RoomEvents.JOIN_ROOM, action.payload);
    });

    yield fork(eventListener, client, RoomEvents.JOINED_ROOM, function* (joinedRoomPayload: JoinedRoomPayload) {
        yield put(joinRoomSuccess(joinedRoomPayload));
        yield put(push(`/poker/${joinedRoomPayload.currentRoomState.name}`));
    });

    yield fork(eventListener, client, RoomEvents.NEW_PLAYER, function* (newPlayerPayload: NewPlayerPayload) {
        yield put(newPlayer(newPlayerPayload.currentRoomState));
        toast(`${newPlayerPayload.newPlayer.name} joined`);
    });

    yield fork(eventListener, client, RoomEvents.CANT_JOIN_INEXISTENT_ROOM, function* () {
        yield put(joinRoomFailure());
        toast('This room does not exist');
    });

    yield fork(eventListener, client, RoomEvents.CANT_JOIN_ALREADY_STARTED_POKER, function* () {
        yield put(joinRoomFailure());
        toast('The poker in this room has already started');
    });

}

export function* leaveRoomSaga({ client }: { client: SocketIOClient.Socket }) {

    yield takeEvery(WebSocketActionTypes.LEAVE_ROOM_REQUEST, function* (action: Action<string, LeaveRoomPayload>) {

        yield fork(eventEmitter, client, RoomEvents.LEAVE_ROOM, action.payload);

    });

    yield fork(eventListener, client, RoomEvents.LEFT_ROOM, function* () {
        yield put(leaveRoomSuccess());
        yield put(push('/'));
    });

    yield fork(eventListener, client, RoomEvents.PLAYER_LEFT, function* (playerLeftPayload: PlayerLeftPayload) {
        yield put(playerLeft(playerLeftPayload.currentRoomState));
        toast(`${playerLeftPayload.playerLeft.name} left`);
    });

    yield fork(eventListener, client, RoomEvents.ADMIN_LEFT, function* (playerLeftPayload: PlayerLeftPayload) {
        yield put(playerLeft(playerLeftPayload.currentRoomState));
        yield put(push('/'));
        toast('The room was destroyed by the Administrator');
    });

    yield fork(eventListener, client, RoomEvents.CANT_LEAVE_INEXISTENT_ROOM, function* () {
        yield put(leaveRoomFailure());
    });

}

export function* createRoomSaga() {

    yield takeEvery(WebSocketActionTypes.CREATE_ROOM_REQUEST, function* (action: Action<string, CreateRoomPayload>) {

        try {
            const { data } = yield call(createRoom, action.payload);

            yield put(joinRoomRequest({
                name: action.payload.playerAdminName,
                room: data.name,
                isAdmin: true,
            }));

            yield put(createRoomSuccess(data));

        } catch (err) {
            toast(err.message);
            yield put(createRoomFailure());
        }

    });

}

