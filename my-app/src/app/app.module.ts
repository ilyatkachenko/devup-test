import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './Material/material.module';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { TaskListComponent } from './content/task-list/task-list.component';
import { NavigationComponent } from './content/navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { ContentComponent } from './content/content.component';

import { AuthGuard } from './services/guard.service';
import { TasksService } from './services/tasks.service';
import { AuthService } from './services/auth.service';

import { routes } from './app.routes';

export const firebaseConfig = {
  apiKey: "AIzaSyAGu8dPjltP6m9Ub1GNBOu-TP5K8xgubi8",
  authDomain: "task-manager-8972e.firebaseapp.com",
  databaseURL: "https://task-manager-8972e.firebaseio.com",
  projectId: "task-manager-8972e",
  storageBucket: "task-manager-8972e.appspot.com",
  messagingSenderId: "433367919995"
};

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    EmailComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    Ng2DragDropModule.forRoot()
  ],
  providers: [TasksService, AuthGuard, AngularFireAuth, AuthService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
