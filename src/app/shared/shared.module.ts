import { NgModule } from "@angular/core";
import { ButtonComponent } from "./components/button/button.component";
import { TableComponent } from "./components/table/table.component";
import { CommonModule } from "@angular/common";
import { PopupComponent } from "./components/popup/popup.component";


@NgModule({
  declarations: [
    ButtonComponent,
    TableComponent,
    PopupComponent
  ],
  exports: [
    TableComponent,
    ButtonComponent,
    PopupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule{}
