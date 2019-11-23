import {createReducer} from '@reduxjs/toolkit';
import {updateSearch, removeImage, selectImage, updateImage, updateTileSize} from 'redux/actions/app.actions';
import {LoremIpsum} from 'lorem-ipsum';
import {random, chain} from 'lodash';
import imageData from 'mock-data/images';
import {TILE_SIZES} from 'constants/tile-sizes';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {max: 8, min: 4},
    wordsPerSentence: {max: 16, min: 4}
});

const transformImageData = imageData => {
    return chain(imageData)
        .map(img => ({
            ...img,
            title: lorem.generateWords(random(1, 3)),
            description: lorem.generateSentences(random(1, 5))
        }))
        .keyBy('id')
        .value();
};
const transformedData = transformImageData(imageData);

const initialState = {
    data: transformedData,
    search: '',
    tileSize: TILE_SIZES.SMALL,
    selectedImageId: null
};

export const appReducer = createReducer(initialState, {
    [updateTileSize]: (state, {payload}) => {
        state.tileSize = payload;
    },
    [updateSearch]: (state, {payload}) => {
        state.search = payload;
    },
    [removeImage]: (state, {payload}) => {
        state.selectedImageId = null;
        delete state.data[payload];
    },
    [selectImage]: (state, {payload}) => {
        state.selectedImageId = payload;
    },
    [updateImage]: (state, {payload}) => {
        const {itemImageId, field, value} = payload;
        state.data[itemImageId][field] = value;
    }
});
