import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from './services/tasks/tasks.service';
import { PopupService } from './shared/services/popup.service';

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
