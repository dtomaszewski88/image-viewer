import {createAction} from '@reduxjs/toolkit';

export const addData = createAction('addData');
export const removeData = createAction('removeData');
export const selectImage = createAction('selectImage');
export const removeImage = createAction('removeImage');
export const updateImage = createAction('updateImage', (itemImageId, field, value) => ({
    payload: {
        itemImageId,
        field,
        value
    }
}));
