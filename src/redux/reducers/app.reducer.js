import {createReducer} from '@reduxjs/toolkit';
import {addData, removeData} from 'redux/actions/app.actions';
import {LoremIpsum} from 'lorem-ipsum';
import {random, map} from 'lodash';
import imageData from 'mock-data/images';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {max: 8, min: 4},
    wordsPerSentence: {max: 16, min: 4}
});
const getThumbUrl = ({id}) => {
    return `https://picsum.photos/id/${id}/300`;
};
const transformImageData = imageData => {
    return map(imageData, img => ({
        ...img,
        title: lorem.generateWords(random(1, 3)),
        description: lorem.generateSentences(random(1, 5)),
        thumbnail_url: getThumbUrl(img)
    }));
};
const initialState = {
    data: transformImageData(imageData)
};

export const appReducer = createReducer(initialState, {
    [addData]: state => state,
    [removeData]: state => state
});
