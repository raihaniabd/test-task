import { Page } from './document.model';

export interface DocumentsState {
    loading: boolean;
    error: any;
    documents: Page[]
}

export const initialDocumentsState: DocumentsState = {
    loading: false,
    error: null,
    documents: []
};
