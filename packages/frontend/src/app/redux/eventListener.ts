import {
    take,
    call,
    fork,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

function createEventListener(client: any, eventName: string) {

    return eventChannel((emit: any) => {
        client.on(eventName, (data: any) => {
            emit(data || {});
        });

        return () => {
            client.off(eventName);
        };
    });
}

export default function* listen(client: any, eventName: string, onRecordChange: any) {
    const channel = yield call(createEventListener, client, eventName);

    while (true) {
        const item = yield take(channel);
        yield fork(onRecordChange, item);
    }
}
