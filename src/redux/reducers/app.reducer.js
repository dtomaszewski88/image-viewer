import {createReducer} from '@reduxjs/toolkit';
import {addData, removeData, removeImage, selectImage, updateImage} from 'redux/actions/app.actions';
import {LoremIpsum} from 'lorem-ipsum';
import {random, chain, unset} from 'lodash';
import imageData from 'mock-data/images';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {max: 8, min: 4},
    wordsPerSentence: {max: 16, min: 4}
});

const getThumbUrl = ({id}) => {
    return `https://picsum.photos/id/${id}/300`;
};

const transformImageData = imageData => {
    return chain(imageData)
        .map(img => ({
            ...img,
            title: lorem.generateWords(random(1, 3)),
            description: lorem.generateSentences(random(1, 5)),
            thumbnail_url: getThumbUrl(img)
        }))
        .keyBy('id')
        .value();
};
const transformedData = transformImageData(imageData);

const initialState = {
    data: transformedData,
    selectedImageId: null
};

export const appReducer = createReducer(initialState, {
    [addData]: state => state,
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
