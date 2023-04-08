import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DocumentsState } from './state';

export const getDocumentsState =
    createFeatureSelector<DocumentsState>('documents');

export const getDocumentLoading = createSelector(
    getDocumentsState,
    (state: DocumentsState) => state.loading
);

export const getDocumentError = createSelector(
    getDocumentsState,
    (state: DocumentsState) => state.error
);

export const getDocuments = createSelector(
    getDocumentsState,
    (state: DocumentsState) => state.documents
);
