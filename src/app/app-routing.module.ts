import { RouterModule, Routes } from '@angular/router';

import { DocumentComponent } from './document/document.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: 'documents/:id',
  component: DocumentComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
