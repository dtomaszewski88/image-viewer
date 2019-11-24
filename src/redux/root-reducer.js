import {combineReducers} from 'redux';
import {appReducer} from './reducers/app.reducer';
import {dataReducer} from './reducers/data.reducer';
import {connectRouter} from 'connected-react-router';

export const rootReducer = history =>
    combineReducers({
        app: appReducer,
        data: dataReducer,
        router: connectRouter(history)
    });
