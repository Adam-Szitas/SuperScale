import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './pages/display/display.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    path: 'display',
    component: DisplayComponent
  },
  {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
