import {createReducer} from '@reduxjs/toolkit';
import {addData, removeData} from 'redux/actions/app.actions';
import uuid from 'uuid/v1';
import {LoremIpsum} from 'lorem-ipsum';
import {random} from 'lodash';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {max: 8, min: 4},
    wordsPerSentence: {max: 16, min: 4}
});

const initialState = {
    data: []
};

export const appReducer = createReducer(initialState, {
    [addData]: state => {
        state.data.push({id: uuid(), text: lorem.generateSentences(random(1, 5))});
    },
    [removeData]: state => {
        state.data = state.data.slice(0, state.data.length - 1);
    }
});
