import {takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'connected-react-router';
import {getOr} from 'lodash/fp';

const getPathFromPayload = getOr('', 'location.pathname');

export const isLocationChange = ({type}) => type === LOCATION_CHANGE;

export function* locationChangeTask({payload}) {
    console.log('Location changed', getPathFromPayload(payload));
    yield null;
}

export function* watchLocation() {
    yield takeLatest(isLocationChange, locationChangeTask);
}
