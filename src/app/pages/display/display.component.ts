import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state/state.service";
import { Task, TasksService } from "src/app/services/tasks/tasks.service";

import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PopupService, PopupState, Status } from "src/app/shared/services/popup.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnInit {
  constructor(private tasksService: TasksService, private state: StateService, private popupService: PopupService){}

  public ngOnInit(): void {
    this.getTasks();
    this.popupService.popupState$.pipe(takeUntil(this.destroy$)).subscribe((state: PopupState) => {
      console.log(state);
      if(state.form){
        this.populateForm(state.form);
      }else{
        this.editForm = null;
      }
      if(state.alertMessage){
        this.alertMessage = state.alertMessage;
      }else{
        this.alertMessage = null;
      }

      this.modalStatus = state.state;
    })
  }

  public tasks$: Observable<Task[] | null> = this.state.taskState;

  public getTasks(): void {
    this.tasksService.getTasks().pipe(take(1)).subscribe({
      next: (tasks: Task[]) => {
        this.state.updateTaskState(tasks);
      }
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public editForm: FormGroup | null = null;
  public modalStatus: Status = Status.closed;
  public alertMessage: string | null = null;

  private destroy$: Subject<boolean> = new Subject();

  private populateForm(form: Task){
    this.editForm = new FormGroup({
      name: new FormControl(form.name, Validators.required),
      type: new FormControl(form.type, Validators.required),
      duration: new FormControl(form.fields.durationInHours, Validators.required),
      id: new FormControl(form._id)
    })
  }

  public hidePopup(): void {
    this.popupService.hide();
  }

  public changeTask(): void {
    this.tasksService.updateTask(this.editForm?.getRawValue()).pipe(take(1)).subscribe()
  }
  public deleteTask(): void {
    this.tasksService.deleteTask(this.editForm?.getRawValue()).pipe(take(1)).subscribe()
  }
}
