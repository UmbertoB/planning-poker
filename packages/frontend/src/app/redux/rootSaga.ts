import {
    joinRoomSaga,
    leaveRoomSaga,
    createRoomSaga,
} from 'app/redux/webSocket/sagas';
import {
    startPoker,
    setTaskDescription,
    cardValuesSelected,
    restartPoker,
} from 'app/redux/poker/sagas';

export default [
    joinRoomSaga,
    leaveRoomSaga,
    createRoomSaga,
    startPoker,
    setTaskDescription,
    cardValuesSelected,
    restartPoker,
];
