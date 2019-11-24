import {createReducer} from '@reduxjs/toolkit';
import {imgDataFetchInit, imgDataFetchFail, imgDataFetchSuccess} from '../actions/data.actions';
import {FETCH_STATUS} from 'constants/fetch-status';
import {removeImage, updateImage} from '../actions/app.actions';

const initialState = {
    imageData: [],
    lastSearch: '',
    status: ''
};

export const dataReducer = createReducer(initialState, {
    [removeImage]: (state, {payload}) => {
        delete state.imageData[payload];
    },
    [updateImage]: (state, {payload}) => {
        const {itemImageId, field, value} = payload;
        state.imageData[itemImageId][field] = value;
    },
    [imgDataFetchInit]: (state, {payload}) => {
        state.imageData = [];
        state.lastSearch = payload;
        state.status = FETCH_STATUS.LOADING;
    },
    [imgDataFetchFail]: state => {
        state.imageData = [];
        state.lastSearch = '';
        state.status = FETCH_STATUS.ERROR;
    },
    [imgDataFetchSuccess]: (state, {payload}) => {
        state.imageData = payload;
        state.status = FETCH_STATUS.READY;
    }
});
