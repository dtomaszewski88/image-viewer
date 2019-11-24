import axios from 'axios';
import {times, clamp, chain, random} from 'lodash';

import {LoremIpsum} from 'lorem-ipsum';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {max: 8, min: 4},
    wordsPerSentence: {max: 16, min: 4}
});

const API_MAX_PAGE_LIMIT = 100;

const getApiUrl = (page = 1, limit = 100) => {
    return `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
};

const transformImageData = responses => {
    return chain(responses)
        .map('data')
        .flatten()
        .map(img => ({
            ...img,
            title: lorem.generateWords(random(1, 3)),
            description: lorem.generateSentences(random(1, 5))
        }))
        .keyBy('id')
        .value();
};

export const fetchImages = async (totalCount = 220) => {
    const requestCount = Math.ceil(totalCount / API_MAX_PAGE_LIMIT);
    const promises = times(requestCount, reqNum => {
        const currentCount = reqNum * API_MAX_PAGE_LIMIT;
        const remainingCount = totalCount - currentCount;
        const url = getApiUrl(reqNum + 1, clamp(remainingCount, 0, API_MAX_PAGE_LIMIT));
        return axios.get(url);
    });
    return Promise.all(promises).then(transformImageData);
};
