import {getOr} from 'lodash/fp';

export const getImagesData = getOr([], 'data.imageData');
export const getImagesStatus = getOr('', 'data.status');
export const getImagesLastSearch = getOr('', 'data.lastSearch');
