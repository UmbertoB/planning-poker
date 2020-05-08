import {
    joinRoomSaga,
    leaveRoomSaga,
    createRoomSaga,
    startPoker,
} from 'app/redux/webSocket/sagas';
import {
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
