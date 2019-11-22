import {combineReducers} from 'redux';
import {appReducer} from './reducers/app.reducer';
import {connectRouter} from 'connected-react-router';

export const rootReducer = history =>
    combineReducers({
        app: appReducer,
        router: connectRouter(history)
    });
