import {createReducer} from '@reduxjs/toolkit';
import {updateFetchCount, updateSearch, removeImage, selectImage, updateTileSize} from 'redux/actions/app.actions';
import {TILE_SIZES} from 'constants/tile-sizes';

const initialState = {
    fetchCount: 100,
    search: '',
    tileSize: TILE_SIZES.SMALL,
    selectedImageId: null
};

export const appReducer = createReducer(initialState, {
    [updateFetchCount]: (state, {payload}) => {
        state.fetchCount = payload;
    },
    [updateTileSize]: (state, {payload}) => {
        state.tileSize = payload;
    },
    [updateSearch]: (state, {payload}) => {
        state.search = payload;
    },
    [removeImage]: state => {
        state.selectedImageId = null;
    },
    [selectImage]: (state, {payload}) => {
        state.selectedImageId = payload;
    }
});
