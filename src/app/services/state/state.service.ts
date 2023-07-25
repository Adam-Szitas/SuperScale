import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from "../tasks/tasks.service";


@Injectable()
export class StateService{
  private taskState$: BehaviorSubject<Task[] | null> = new BehaviorSubject<Task[] | null>(null);

  public taskState: Observable<Task[] | null> = this.taskState$.asObservable();

  public updateTaskState(taskState: Task[]): void {
    this.taskState$.next(taskState);
  }
}
