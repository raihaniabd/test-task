import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  dragging: boolean = false;


  currentZoom = 1.0;
  clickTime = Date.now();
  constructor(public dialog: MatDialog, private overlay: Overlay, private _store: Store<RootStoreState.State>, private renderer: Renderer2, private route: ActivatedRoute, private router: Router) { }

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

  @HostListener('window:scroll')
  onWindowScroll(event: any) {
    this.images.forEach((image, index) => {
      const imageElement = this.renderer.selectRootElement(`.document-page-${index}`, true);
      const elementTop = imageElement.getBoundingClientRect().top;
      const viewportBottom = window.innerHeight;

      if (elementTop < viewportBottom) {
        this.router.navigate(['documents/1/pages/' + (index + 1).toString()], {
          replaceUrl: true
        });
      }
    });
  }

  onGlobalClick(event: MouseEvent) {
    this.images.forEach((page, pageIndex) => {
      page.descriptions?.forEach((description, descriptionIndex) => {
        this.onDescriptionShowMenu(event, pageIndex, descriptionIndex, false);
      });
      page.images?.forEach((image, imageIndex) => {
        this.onImageShowMenu(event, pageIndex, imageIndex, false);
      });
    });
  }

  onImageShowMenu(event: any, pageIndex: number, index: number, isActive: boolean) {
    this._store.dispatch(DocumentStoreActions.updateImageMenu({
      id: '1',
      page: pageIndex,
      imageIndex: index,
      isActive
    }));

  }

  onDescriptionShowMenu(event: any, pageIndex: number, index: number, isActive: boolean) {
    this._store.dispatch(DocumentStoreActions.updateDescriptionMenu({
      id: '1',
      page: pageIndex,
      descriptionIndex: index,
      isActive
    }));
  }

  cdkDragStarted() {
    this.dragging = true;
  }

  cdkDragEnded() {
    this.dragging = false;
  }

  public onMouseDown(event: MouseEvent, pageIndex: number, index: number, isActive: boolean, type: string): void {
    this.clickTime = Date.now();
  }

  public onMouseUp(event: MouseEvent, pageIndex: number, index: number, isActive: boolean, type: string): void {
    const endTime = Date.now();
    const timeDiff = endTime - this.clickTime;
    console.log(timeDiff);
    if (timeDiff < 80) {
      if (type === 'description') {
        this.onDescriptionShowMenu(event, pageIndex, index, isActive);
      } else {
        this.onImageShowMenu(event, pageIndex, index, isActive);
      }
    }
  }
}

