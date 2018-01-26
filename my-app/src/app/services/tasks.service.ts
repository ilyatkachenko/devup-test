import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {Tasks} from '../Tasks';

@Injectable()
export class TasksService {
  private nextId : number;
  constructor() {
    let tasks = this.getTask();

    if(tasks.length == 0){
      this.nextId = 0;
    }else {
      let maxId = tasks[tasks.length - 1].id;
      this.nextId = maxId + 1;
    }
   }

  public addTask(title: string, description: string, status: string) : void{
    let task = new Tasks(this.nextId, title, description, status);
    let tasks = this.getTask();
    tasks.push(task);
    this.setTask(tasks);
    this.nextId++;
  }

  public updateTask(id: number, title: string, description: string, status: string) : void{
    let tasks = this.getTask();
    tasks.forEach((task) => {
      if(task.id == id){
        task.title = title;
        task.description = description;
        task.status = status;
      }
    });
    this.setTask(tasks);
  }

  public getTask(): Tasks[]{
    let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
    return localStorageItem == null ? [] : localStorageItem.tasks;
  }

  public removeTask(id: number): void{
    let tasks = this.getTask();
    tasks = tasks.filter((task) => task.id != id);
    this.setTask(tasks);
  }

  public setTask(tasks: Tasks[]) : void{
    localStorage.setItem('tasks', JSON.stringify({tasks: tasks}));
  }
}
