/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AnnotationOverlayComponent } from './annotation-overlay.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DescriptionDialogComponent', () => {
  let component: AnnotationOverlayComponent;
  let fixture: ComponentFixture<AnnotationOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
