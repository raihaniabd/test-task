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
  on(DocumentsActions.updateImagePositionSuccess, (state, { imageIndex, id, page, x, y }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].images[imageIndex].x = x;
          document.pages[page].images[imageIndex].y = y;
        }
        return document;
      })
    }
  }),
  on(DocumentsActions.updateDescriptionPositionSuccess, (state, { descriptionIndex, id, page, x, y }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].descriptions[descriptionIndex].x = x;
          document.pages[page].descriptions[descriptionIndex].y = y;
        }
        return document;
      })
    }
  }),
  on(DocumentsActions.updateDescriptionMenuSuccess, (state, { descriptionIndex, id, page, isActive }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].descriptions[descriptionIndex].isActive = isActive;
        }
        return document;
      })
    }
  }),
  on(DocumentsActions.updateImageMenuSuccess, (state, { imageIndex, id, page, isActive }) => {
    return {
      ...state,
      documents: state.documents.map((document: any) => {
        if (document.id === id) {
          document.pages[page].images[imageIndex].isActive = isActive;
        }
        return document;
      })
    }
  }),
);

export const reducer = (state: DocumentsState | undefined, action: Action): any => documentReducer(state, action);
