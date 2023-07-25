import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TasksService } from './services/tasks/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PopupService, PopupState, Status } from './shared/services/popup.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private popupService: PopupService, private tasksService: TasksService){}

  title = 'SuperScale';

  public get activeRoute(): string {
    return this.router.url;
  }
}
