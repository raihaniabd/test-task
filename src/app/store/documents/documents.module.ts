import { CommonModule } from '@angular/common';
import { DocumentsEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('documents', reducer),
        EffectsModule.forFeature([DocumentsEffects]),
    ],
})
export class DocumentsStoreModule {}
