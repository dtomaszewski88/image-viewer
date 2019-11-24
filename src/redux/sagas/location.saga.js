import {takeLatest, call, put, select} from 'redux-saga/effects';
import {INDEX_PAGE, MAIN_PAGE} from '../../constants/url.constants';
import {LOCATION_CHANGE} from 'connected-react-router';
import {getOr} from 'lodash/fp';

import {imgDataFetchFail, imgDataFetchInit, imgDataFetchSuccess} from '../actions/data.actions';
import {updateFetchCount} from '../actions/app.actions';
import {getFetchCount} from '../selectors';
import {getImagesLastSearch} from '../selectors/data.selectors';
import {fetchImages} from '../services/fetch-images-service';
const getPathFromPayload = getOr('', 'location.pathname');

export const isMainPage = ({type, payload}) => {
    if (type !== LOCATION_CHANGE) {
        return false;
    }
    const path = getPathFromPayload(payload);
    return path === INDEX_PAGE || path === MAIN_PAGE;
};

export function* loadImagesTask() {
    const fetchCount = yield select(getFetchCount);
    const lastSearch = yield select(getImagesLastSearch);
    if (lastSearch === fetchCount) {
        return;
    }
    yield put(imgDataFetchInit(fetchCount));
    try {
        const data = yield call(fetchImages, fetchCount);
        yield put(imgDataFetchSuccess(data));
    } catch (error) {
        yield put(imgDataFetchFail(error));
    }
}

export function* watchLoadImages() {
    yield takeLatest([isMainPage, updateFetchCount.type], loadImagesTask);
}
