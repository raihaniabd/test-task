import { Component } from '@angular/core';
import { DocumentStoreActions } from '../store/documents';
import { OverlayRef } from '@angular/cdk/overlay';
import { RootStoreState } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-annotation-overlay',
  templateUrl: './annotation-overlay.component.html',
  styleUrls: ['./annotation-overlay.component.scss']
})
export class AnnotationOverlayComponent {
  annotation = '';
  pageIndex = 0;

  imageUrl = '';
  descriptionText = '';
  overlayRef: OverlayRef | null = null;

  x = 0;
  y = 0;
  constructor(private _store: Store<RootStoreState.State>) {
  }

  addText(): void {
    this._store.dispatch(DocumentStoreActions.addDescriptionToPage({
      id: '1',
      page: this.pageIndex,
      description: {
        x: this.x,
        y: this.y,
        text: this.descriptionText,
        isActive: false
      }
    }));
    this.overlayRef?.dispose();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        const base64Image = this.imageUrl.split(',')[1];
        console.log('Base64 Image:', base64Image);
      };
    }
  }

  addImage(): void {
    this._store.dispatch(DocumentStoreActions.addImageToPage({
      id: '1',
      page: this.pageIndex,
      image: {
        x: this.x,
        y: this.y,
        src: this.imageUrl,
        isActive: false
      }
    }));
    this.overlayRef?.dispose();
  }
}

