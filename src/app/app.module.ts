import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AnnotationOverlayComponent } from './annotation-overlay/annotation-overlay.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CoreStoreModule } from './store/store.module';
import { DocumentComponent } from './document/document.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    AnnotationOverlayComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatTooltipModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    DragDropModule,
    CoreStoreModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  exports: [
    AnnotationOverlayComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
