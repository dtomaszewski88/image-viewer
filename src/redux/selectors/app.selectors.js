import {createSelector} from '@reduxjs/toolkit';
import {map, chain, filter} from 'lodash';
import {getOr, orderBy} from 'lodash/fp';

export const getAppData = getOr([], 'app.data');
export const getSearch = getOr([], 'app.search');
export const getTileSize = getOr([], 'app.tileSize');
export const getSelectedImageId = getOr(null, 'app.selectedImageId');

const makeGetThumbUrl = width => ({id}) => {
    return `https://picsum.photos/id/${id}/${width}`;
};

const getSearchValue = item =>
    chain(item)
        .pick(['author', 'title'])
        .values()
        .join(' ')
        .value();

const makeSearchMatcher = search => item => {
    const searchValue = getSearchValue(item);
    return searchValue.indexOf(search) !== -1;
};

export const getFilteredData = createSelector([getAppData, getSearch], (data, search) => {
    if (!search || search.length < 3) {
        return data;
    }
    const searchMatcher = makeSearchMatcher(search);
    return filter(data, searchMatcher);
});

export const getSortedData = createSelector([getFilteredData], orderBy(['id'], ['asc']));

export const getImgDataWithThumbnailUrl = createSelector([getSortedData, getTileSize], (imgData, tileSize) => {
    const {width} = tileSize;
    const getThumbUrl = makeGetThumbUrl(width);
    return map(imgData, item => ({...item, thumbnail_url: getThumbUrl(item)}));
});

export const getSelectedImage = createSelector([getAppData, getSelectedImageId], (data, selectedImageId) => {
    if (!selectedImageId) {
        return null;
    }
    return data[selectedImageId];
});
