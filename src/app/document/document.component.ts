import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DocumentStoreActions, DocumentStoreSelectors } from '../store/documents';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Store, select } from '@ngrx/store';

import { AnnotationOverlayComponent } from '../annotation-overlay/annotation-overlay.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Page } from '../store/documents/document.model';
import { RootStoreState } from '../store';
import { removeDescription } from './../store/documents/actions';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, AfterViewInit, OnDestroy {
  images: Page[] = [];
  @ViewChild('bookPagesRef') bookPagesRef!: ElementRef;
  @ViewChild('documentRef') documentRef!: ElementRef;
  private overlayRef: OverlayRef | null = null;
  documents$: Observable<any[]> | undefined;

  currentZoom = 1.0;
  constructor(public dialog: MatDialog, private overlay: Overlay, private _store: Store<RootStoreState.State>) { }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this._store.dispatch(DocumentStoreActions.getDocuments());


    this.documents$ = this._store.pipe(
      select(DocumentStoreSelectors.getDocuments)
    );

    this.documents$.subscribe((documents) => {
      this.images = documents[0].pages;
    });
  }

  addDescription(event: MouseEvent, pageIndex: number): void {
    event.stopPropagation();
    this.openDescriptionOverlay(event, pageIndex);
  }


  openDescriptionOverlay(event: MouseEvent, pageIndex: number): void {
    event.stopPropagation();

    // Get the cursor position relative to the document
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    // Create an overlay configuration with the position set to the cursor location
    const positionStrategy = this.overlay.position()
      .global()
      .left(`${cursorX}px`)
      .top(`${cursorY}px`);
    const config = new OverlayConfig({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    // Create the overlay and attach the DescriptionOverlayComponent to it
    this.overlayRef = this.overlay.create(config);
    const descriptionPortal = new ComponentPortal(AnnotationOverlayComponent);
    const descriptionComponentRef = this.overlayRef.attach(descriptionPortal);

    // Pass the necessary data to the component instance
    descriptionComponentRef.instance.pageIndex = pageIndex;
    descriptionComponentRef.instance.overlayRef = this.overlayRef;
    descriptionComponentRef.instance.x = event.offsetX;
    descriptionComponentRef.instance.y = event.offsetY;

    // Subscribe to the overlay backdrop click event to close the overlay
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.dispose();
    });
  }

  save(): void {
    console.log(this.images);
  }

  zoomIn(): void {
    this.currentZoom += 0.1;
  }

  zoomOut(): void {
    this.currentZoom -= 0.1;
  }

  removeDescription(pageIndex: number, index: number): void {
    this._store.dispatch(DocumentStoreActions.removeDescription({
      id: '1',
      page: pageIndex,
      descriptionIndex: index
    }));
  }

  removeImage(pageIndex: number, index: number): void {
    this._store.dispatch(DocumentStoreActions.removeImage({
      id: '1',
      page: pageIndex,
      imageIndex: index
    }));
  }

  onDescriptionDragEnded(event: any, pageIndex: number, index: number) {
    this._store.dispatch(DocumentStoreActions.updateDescriptionPosition({
      id: '1',
      page: pageIndex,
      descriptionIndex: index,
      x: parseInt(event.source.element.nativeElement.style.left, 10),
      y: parseInt(event.source.element.nativeElement.style.top, 10),
    }));
  }

  onImageDragEnded(event: any, pageIndex: number, index: number) {
    this._store.dispatch(DocumentStoreActions.updateImagePosition({
      id: '1',
      page: pageIndex,
      imageIndex: index,
      x: parseInt(event.source.element.nativeElement.style.left, 10),
      y: parseInt(event.source.element.nativeElement.style.top, 10),
    }));
  }
}

