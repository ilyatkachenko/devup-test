import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Tasks } from '../Tasks';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class TasksService {
  private nextId: number;
  userId: string;
  taskRef: AngularFirestoreDocument<any>;
  user;
  items;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.taskRef = this.afs.doc(`tasks/${this.userId}`);

        this.afs.doc(`tasks/${this.userId}`).valueChanges().subscribe(success => {
          if (success) {
            this.user = success;
            this.items = this.user.tasks;
          }
        });
      }
    });
  }

  public addTask(task: any): void {
    let taskObj = task;

    if (!this.items) {
      this.nextId = 0;
    } else {
      let maxId = this.items[this.items.length - 1].id;
      this.nextId = maxId + 1;
    }

    taskObj.id = this.nextId;
    let tasksArr = this.items ? this.items : [];
    tasksArr.push(taskObj);
    this.taskRef.update({ tasks: tasksArr });
    this.nextId++;
  }

  public updateTask(task: any): void {
    this.items.map((item, i, arr) => {
      if (item.id == task.id) {
        return arr.splice(i, 1, task);
      }
    });
    this.taskRef.update({ tasks: this.items });
  }

  public removeTask(id: number): void {
    let arr = this.items.filter((task, i, arr) => task.id != id);
    this.taskRef.update({ tasks: arr });
  }

  public dragNdrop(tasks: any, e: any, taskStatus: string){
    tasks.forEach((task) => {
      if (task.id == e.dragData.id) {
        task.status = taskStatus;
      }
    });
    this.taskRef.update({ tasks: tasks });
  }
}