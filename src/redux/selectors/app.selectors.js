import {createSelector} from '@reduxjs/toolkit';
import {getOr, orderBy} from 'lodash/fp';

export const getAppData = getOr([], 'app.data');
export const getSelectedImageId = getOr(null, 'app.selectedImageId');
export const getSortedData = createSelector([getAppData], orderBy(['id'], ['asc']));
export const getSelectedImage = createSelector([getAppData, getSelectedImageId], (data, selectedImageId) => {
    if (!selectedImageId) {
        return null;
    }
    return data[selectedImageId];
});
