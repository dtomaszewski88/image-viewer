import {all, call} from 'redux-saga/effects';

import {watchLoadImages} from './sagas/location.saga';

export function* rootSaga() {
    yield all([call(watchLoadImages)]);
}
