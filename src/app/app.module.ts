import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PageModule } from './pages/page.module';
import { TasksService } from './services/tasks/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpRestHandler } from './services/handlers/http.handler';
import { StateService } from './services/state/state.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    // No need for lazy loading => eager loading preferred for smaller apps
    SharedModule,
    PageModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    TasksService,
    HttpClientModule,
    HttpRestHandler,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
