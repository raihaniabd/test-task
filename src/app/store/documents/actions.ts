import { createAction, props } from '@ngrx/store';

export const getDocuments = createAction(
  '[Documents] Get Documents'
);

export const getDocumentsSuccess = createAction(
  '[Documents] Get Documents Success',
  props<{ response: any }>()
);

export const getDocumentsFailure = createAction(
  '[Documents] Get Documents Failure',
  props<{ error: any }>()
);

export const updateDocument = createAction(
  '[Documents] Update Documents'
);

export const updateDocumentSuccess = createAction(
  '[Documents] Update Documents Success',
  props<{ response: any }>()
);

export const updateDocumentFailure = createAction(
  '[Documents] Update Documents Failure',
  props<{ error: any }>()
);

export const addDescriptionToPage = createAction(
  '[Documents] Add Description To Page',
  props<{ id: string; page: number; description: any }>()
);

export const addDescriptionToPageSuccess = createAction(
  '[Documents] Add Description To Page Success',
  props<{ response: any }>()
);

export const addDescriptionToPageFailure = createAction(
  '[Documents] Add Description To Page Failure',
  props<{ error: any }>()
);

export const addImageToPage = createAction(
  '[Documents] Add Image To Page',
  props<{ id: string; page: number; image: any }>()
);

export const addImageToPageSuccess = createAction(
  '[Documents] Add Image To Page Success',
  props<{ response: any }>()
);

export const addImageToPageFailure = createAction(
  '[Documents] Add Image To Page Failure',
  props<{ error: any }>()
);

export const removeDescription = createAction(
  '[Documents] Remove Description',
  props<{ id: string; page: number; descriptionIndex: number }>()
);

export const removeDescriptionSuccess = createAction(
  '[Documents] Remove Description Success',
  props<{ id: string; page: number; descriptionIndex: number }>()
);

export const removeDescriptionFailure = createAction(
  '[Documents] Remove Description Failure',
  props<{ error: any }>()
);

export const removeImage = createAction(
  '[Documents] Remove Image Page',
  props<{ id: string; page: number; imageIndex: number }>()
);

export const removeImageSuccess = createAction(
  '[Documents] Remove Image Success',
  props<{ id: string; page: number; imageIndex: number }>()
);

export const removeImageFailure = createAction(
  '[Documents] Remove Image Failure',
  props<{ error: any }>()
);

export const updateDescriptionPosition = createAction(
  '[Documents] Update Description Position',
  props<{ id: string; page: number; descriptionIndex: number, x: number; y: number }>()
);

export const updateDescriptionPositionSuccess = createAction(
  '[Documents] Update Description Position Success',
  props<{ id: string; page: number; descriptionIndex: number, x: number; y: number }>()
);

export const updateDescriptionPositionFailure = createAction(
  '[Documents] Update Description Position Failure',
  props<{ error: any }>()
);

export const updateImagePosition = createAction(
  '[Documents] Update Image Position',
  props<{ id: string; page: number; imageIndex: number, x: number; y: number }>()
);

export const updateImagePositionSuccess = createAction(
  '[Documents] Update Image Position Success',
  props<{ id: string; page: number; imageIndex: number, x: number; y: number }>()
);

export const updateImagePositionFailure = createAction(
  '[Documents] Update Image Position Failure',
  props<{ error: any }>()
);

export const updateImageMenu = createAction(
  '[Documents] Update Image Menu',
  props<{ id: string; page: number; imageIndex: number, isActive: boolean }>()
);

export const updateImageMenuSuccess = createAction(
  '[Documents] Update Image Menu Success',
  props<{ id: string; page: number; imageIndex: number, isActive: boolean }>()
);

export const updateImageMenuFailure = createAction(
  '[Documents] Update Image Menu Failure',
  props<{ error: any }>()
);

export const updateDescriptionMenu = createAction(
  '[Documents] Update Description Menu',
  props<{ id: string; page: number; descriptionIndex: number, isActive: boolean }>()
);

export const updateDescriptionMenuSuccess = createAction(
  '[Documents] Update Description Menu Success',
  props<{ id: string; page: number; descriptionIndex: number, isActive: boolean }>()
);

export const updateDescriptionMenuFailure = createAction(
  '[Documents] Update Description Menu Failure',
  props<{ error: any }>()
);
