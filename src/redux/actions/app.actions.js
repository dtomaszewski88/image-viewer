import {createAction} from '@reduxjs/toolkit';

export const updateTileSize = createAction('updateTileSize');
export const updateSearch = createAction('updateSearch');
export const selectImage = createAction('selectImage');
export const removeImage = createAction('removeImage');
export const updateImage = createAction('updateImage', (itemImageId, field, value) => ({
    payload: {
        itemImageId,
        field,
        value
    }
}));
