import {
    call,
} from 'redux-saga/effects';

function createEventEmitter(client: SocketIOClient.Socket, eventName: string, payload?: any) {
    client.emit(eventName, payload);
}

export default function* emit(client: SocketIOClient.Socket, eventName: string, payload?: any) {
    yield call(createEventEmitter, client, eventName, payload);
}
