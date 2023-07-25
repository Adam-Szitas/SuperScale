import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state/state.service";
import { Task, TaskForm, TasksService } from "src/app/services/tasks/tasks.service";

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    this.tasksService.getTasks().subscribe({
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
  public modalStatus: Status = Status.hidden;
  public alertMessage: string | null = null;
  public newTaskForm: FormGroup | null = null;

  public showNewTaskForm: boolean = false;

  private destroy$: Subject<boolean> = new Subject();

  private populateForm(form: Task){
    this.editForm = new FormGroup({
      name: new FormControl(form.name, Validators.required),
      type: new FormControl(form.type, Validators.required),
      duration: new FormControl(form.fields.durationInHours, Validators.required),
      id: new FormControl(form._id),
      room: new FormControl(form.fields.room, Validators.required),
      person: new FormControl(form.fields.who, Validators.required)
    })
  }

  public addNewTask(): void {
    this.newTaskForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      room: new FormControl('', Validators.required),
      person: new FormControl('', Validators.required)
    })
    this.showNewTaskForm = true;
    this.modalStatus = Status.shown;
  }

  public submitNewTask(): void {
    if(this.isFormValid(this.newTaskForm?.getRawValue())){
      this.tasksService.submitNewTask(this.newTaskForm?.getRawValue()).subscribe({
        next: () => {
          this.getTasks();
          this.popupService.hide();
        }
      })
    }
  }

  public hidePopup(): void {
    this.popupService.hide();
  }

  public changeTask(): void {
    this.tasksService.updateTask(this.editForm?.getRawValue()).subscribe({
      next: () => {
        this.getTasks();
        this.popupService.hide();
      }
    })
  }
  public deleteTask(): void {
    this.tasksService.deleteTask(this.editForm?.getRawValue()).subscribe({
      next: () => {
        this.getTasks();
        this.popupService.hide();
      }
    })
  }

  private isFormValid(form: TaskForm){
    if(!form.name.length){
      return false
    }
    if(!form.type.length){
      return false;
    }
    if(form.type === 'wash-dishes' && !form.duration){
      return false;
    }else if(form.type === 'vacuum-clean' && !(form.room || form.person)){
      return false;
    }
    return true;
  }
}
