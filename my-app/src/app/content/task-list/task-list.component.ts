import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { TasksService } from '../../services/tasks.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tasks } from '../../Tasks';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  closeResult: string;
  addNewTaskModal: any;
  addUpdateModal: any;
  tasks: any;
  user: any;
  addNewTaskform: FormGroup;
  updateform: FormGroup;
  statuses = [
    { value: 'to do' },
    { value: 'doing' },
    { value: 'done' }
  ];

  constructor(private modalService: NgbModal,
    private tasksService: TasksService,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore) { }

  addTask(event) {
    event.preventDefault();
    let title = this.addNewTaskform.value.title;
    let description = this.addNewTaskform.value.description;
    let status = this.addNewTaskform.value.status;

    const task = {
      title: title,
      description: description,
      status: status
    }
    if (this.addNewTaskform.controls.title.valid == true && this.addNewTaskform.controls.status.valid == true) {
      this.tasksService.addTask(task);
      this.addNewTaskform.reset();
      this.addNewTaskModal.close();
    }
  }

  updateTask(event) {
    event.preventDefault();

    let id = this.updateform.value.id;
    let title = this.updateform.value.title;
    let description = this.updateform.value.description;
    let status = this.updateform.value.status;

    const task = {
      id: id,
      title: title,
      description: description,
      status: status
    }

    if (this.updateform.controls.title.valid == true && this.updateform.controls.status.valid == true && this.updateform.controls.id.valid == true) {
      this.tasksService.updateTask(task);
      this.addUpdateModal.close();
    }
  }

  removeTask(id, event) {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    this.tasksService.removeTask(id);
  }

  openNewTaskForm(content) {
    this.addNewTaskModal = this.modalService.open(content);
    this.addNewTaskModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateForm(content, task) {
    this.addUpdateModal = this.modalService.open(content);
    this.addUpdateModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    (<FormControl>this.updateform.controls['id']).setValue(task.id);
    (<FormControl>this.updateform.controls['title']).setValue(task.title);
    (<FormControl>this.updateform.controls['description']).setValue(task.description);
    (<FormControl>this.updateform.controls['status']).setValue(task.status);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onItemDrop(e: any, taskStatus: string) {
    this.tasksService.dragNdrop(this.tasks, e, taskStatus);
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs.doc(`tasks/${user.uid}`).valueChanges().subscribe(success => {
          if (success) {
            this.user = success;
            this.tasks = this.user.tasks;
          }
        });
      }
    });

    this.addNewTaskform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(),
      status: new FormControl('', Validators.required),
    }, { updateOn: 'submit' });

    this.updateform = new FormGroup({
      id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl(),
      status: new FormControl('', Validators.required),
    }, { updateOn: 'submit' });
  }

}
