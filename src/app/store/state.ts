import { DocumentStoreState } from './documents';
import { RouterReducerState } from '@ngrx/router-store';

export interface State {
  router: RouterReducerState;

  'documents-core': DocumentStoreState.DocumentsState;
}
