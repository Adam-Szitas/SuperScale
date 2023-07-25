import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
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

  @Output()
  public newTask: EventEmitter<boolean> = new EventEmitter();

  constructor(private popupService: PopupService){}

  public editElement(task: Task): void {
    const newState: PopupState = {
      form: task,
      alertMessage: null,
      state: Status.shown
    }
    this.popupService.updateState(newState);
  }

  public addNewTask(): void {
    this.newTask.emit(true);
  }

  public deleteElement(task: Task): void{
    const newState: PopupState = {
      form: task,
      alertMessage: 'Are you sure you want to delete this item?',
      state: Status.shown
    }
    this.popupService.updateState(newState);
  }
}
