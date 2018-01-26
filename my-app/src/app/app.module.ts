import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/material.module';
import {FormsModule} from '@angular/forms';
import { TasksService } from './services/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2DragDropModule.forRoot()
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
