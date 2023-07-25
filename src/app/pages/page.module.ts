import { NgModule } from '@angular/core';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DisplayComponent,
    EditComponent
  ],
  exports: [
    DisplayComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PageModule{}
