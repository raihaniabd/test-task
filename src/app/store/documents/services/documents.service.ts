import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) { }

  // This can be replaced with a working API call
  public getDocuments(): Observable<any> {
    return of([
      {
        id: '1',
        name: 'Document 1',
        pages: [
          {
            src: '/assets/pages/1.png',
            descriptions: [],
            images: []
          }, {
            src: '/assets/pages/2.png',
            descriptions: [],
            images: []
          }, {
            src: '/assets/pages/3.png',
            descriptions: [],
            images: []
          }, {
            src: '/assets/pages/4.png',
            descriptions: [],
            images: []
          }, {
            src: '/assets/pages/5.png',
            descriptions: [],
            images: []
          }
        ]
      }
    ]);
  }

  // This can be replaced with a working API call
  public removeImage(): Observable<any> {
    return of(true);
  }

  // This can be replaced with a working API call
  public removeDescription(): Observable<any> {
    return of(true);
  }


  // This can be replaced with a working API call
  public updateImageMenu(): Observable<any> {
    return of(true);
  }
}
