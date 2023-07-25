import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Task } from 'src/app/services/tasks/tasks.service';
import { Status } from '../../services/popup.service';

@Component({
  selector: 'ui-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent{
  @Input()
  public status: Status = Status.hidden;

  public showContent(): boolean {
    return this.status === Status.shown;
  }
}
