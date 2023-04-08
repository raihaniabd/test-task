import * as DocumentsActions from './actions';

import { Action, createReducer, on } from '@ngrx/store';
import { DocumentsState, initialDocumentsState } from './state';

const documentReducer = createReducer(
  initialDocumentsState,
  on(DocumentsActions.getDocumentsSuccess, (state, { response }) => {
    return {
      ...state,
      documents: response
    }
  }),
  on(DocumentsActions.addDescriptionToPage, (state, { description, id, page }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].descriptions = [...document.pages[page].descriptions, description];
        }
        return document;
      })
    }
  }),
  on(DocumentsActions.addImageToPage, (state, { image, id, page }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].images = [...document.pages[page].images, image];
        }
        return document;
      })
    }
  }),
  on(DocumentsActions.removeDescriptionSuccess, (state, { descriptionIndex, id, page }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].descriptions.splice(descriptionIndex, 1);
        }
        return document;
      })
    }
  }),
  on(DocumentsActions.removeImageSuccess, (state, { imageIndex, id, page }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].images.splice(imageIndex, 1);
        }
        return document;
      })
    }
  }),
);

export const reducer = (state: DocumentsState | undefined, action: Action): any => documentReducer(state, action);
