import { RouterModule, Routes } from '@angular/router';

import { DocumentComponent } from './document/document.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: 'documents/:id/pages/:pageId',
  component: DocumentComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
