import {
    createStore,
    Store,
    applyMiddleware,
    Middleware,
    AnyAction,
} from 'redux';
import io from 'socket.io-client';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { ApplicationState } from 'app/redux/rootReducer';
import rootSaga from 'app/redux/rootSaga';
import { backendURLPath, env } from 'environment';

export const history = createBrowserHistory();
const middlewares: Middleware[] = [];

// redux logger middlware
if (env === 'development') {
    middlewares.push(createLogger({ collapsed: true, duration: true, diff: true }));
}

// saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// router history middleware
middlewares.push(routerMiddleware(history));

// app reducers
const appReducer = (state: ApplicationState | undefined, action: AnyAction) => {

    let appState = state;

    if (action.type === 'LEAVE_ROOM_SUCCESS') {
        appState = undefined;
    }

    return rootReducer(history)(appState, action);
};

const store: Store<ApplicationState> = createStore(
    appReducer,
    applyMiddleware(...middlewares),
);

const client = io(backendURLPath);
rootSaga.forEach((saga) => {
    sagaMiddleware.run(saga, { client });
});

export default store;
