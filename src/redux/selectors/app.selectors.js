import {createSelector} from '@reduxjs/toolkit';

import {getOr} from 'lodash/fp';

export const getAppData = getOr([], 'app.data');
export const getAppDataCount = createSelector([getAppData], data => data.length);
