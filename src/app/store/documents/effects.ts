import * as DocumentsActions from './actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';

import { DocumentService } from './services/documents.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class DocumentsEffects {
  getDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentsActions.getDocuments),
      switchMap(() =>
        this.documentService.getDocuments().pipe(
          map((response: any) => {
            return DocumentsActions.getDocumentsSuccess({ response });
          }),
          catchError((error: any) => {
            return of(DocumentsActions.getDocumentsFailure({ error }));
          })
        )
      )
    )
  );


  removeDescription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentsActions.removeDescription),
      switchMap(_ =>
        this.documentService.removeDescription().pipe(
          map((response: any) => {
            return DocumentsActions.removeDescriptionSuccess({ descriptionIndex: _.descriptionIndex, id: _.id, page: _.page });
          }),
          catchError((error: any) => {
            return of(DocumentsActions.removeDescriptionFailure({ error }));
          })
        )
      )
    )
  );


  removeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentsActions.removeImage),
      switchMap(_ =>
        this.documentService.removeDescription().pipe(
          map((response: any) => {
            return DocumentsActions.removeImageSuccess({ imageIndex: _.imageIndex, id: _.id, page: _.page });
          }),
          catchError((error: any) => {
            return of(DocumentsActions.removeImageFailure({ error }));
          })
        )
      )
    )
  );

  updateDescriptionMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentsActions.updateDescriptionMenu),
      switchMap(_ =>
        this.documentService.updateImageMenu().pipe(
          map((response: any) => {
            return DocumentsActions.updateDescriptionMenuSuccess({ descriptionIndex: _.descriptionIndex, id: _.id, page: _.page, isActive: _.isActive });
          }),
          catchError((error: any) => {
            return of(DocumentsActions.updateDescriptionMenuFailure({ error }));
          })
        )
      )
    )
  );

  updateImageMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentsActions.updateImageMenu),
      switchMap(_ =>
        this.documentService.updateImageMenu().pipe(
          map((response: any) => {
            return DocumentsActions.updateImageMenuSuccess({ imageIndex: _.imageIndex, id: _.id, page: _.page, isActive: _.isActive });
          }),
          catchError((error: any) => {
            return of(DocumentsActions.updateImageMenuFailure({ error }));
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private documentService: DocumentService
  ) { }
}
