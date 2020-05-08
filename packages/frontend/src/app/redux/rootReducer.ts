import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

// reducers
import webSocket from 'app/redux/webSocket/reducers';
import poker from 'app/redux/poker/reducers';

// states
import { WebSocketReducerState } from 'app/redux/webSocket/types';
import { PokerReducerState } from 'app/redux/poker/types';

const rootReducer = (history: History) => combineReducers({
     webSocket,
     poker,
     router: connectRouter(history),
});

export interface ApplicationState {
     webSocket: WebSocketReducerState
     poker: PokerReducerState
     router: RouterState
}

export default rootReducer;
