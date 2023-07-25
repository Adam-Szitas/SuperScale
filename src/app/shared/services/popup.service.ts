import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/services/tasks/tasks.service';

export enum Status{
  alert,
  form,
  closed
}

const initialState: PopupState = {
  state: Status.closed,
  form: null,
  alertMessage: null
}

@Injectable({providedIn: 'root'})
export class PopupService{
  private popupState: BehaviorSubject<PopupState> = new BehaviorSubject(initialState);

  public popupState$: Observable<PopupState> = this.popupState.asObservable();

  public updateState(state: PopupState) {
    this.popupState.next(state);
  }

  public hide(): void {
    const state: PopupState = {
      form: null,
      alertMessage: null,
      state: Status.closed
    }
    this.popupState.next(state);
  }
}

export interface PopupState{
  state: Status;
  form: Task | null;
  alertMessage: string | null;
}
