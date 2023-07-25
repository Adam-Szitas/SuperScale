import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Task } from "src/app/services/tasks/tasks.service";
import { PopupService, PopupState, Status } from "../../services/popup.service";

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent{

  @Input()
  public tableData: Task[] | null = null;

  constructor(private popupService: PopupService){}

  public editElement(task: Task): void {
    console.log('edit clicked', task);
    const newState: PopupState = {
      form: task,
      alertMessage: null,
      state: Status.form
    }
    this.popupService.updateState(newState);
  }

  public deleteElement(task: Task): void{
    const newState: PopupState = {
      form: task,
      alertMessage: 'Are you sure you want to delete this item?',
      state: Status.alert
    }
    this.popupService.updateState(newState);
  }
}
