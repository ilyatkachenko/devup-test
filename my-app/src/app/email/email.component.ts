import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  private login: FormGroup;
  error: any;

  constructor(public afAuth: AngularFireAuth,private router: Router, public authS: AuthService) {

  }

  onSubmit(formData) {
    if(this.login.controls.email.valid == true && this.login.controls.password.valid == true){
      this.afAuth.auth.signInWithEmailAndPassword(this.login.value['email'], this.login.value['password'])
      .then(
        (credential) => {
          console.log(credential);
          this.authS.updateUserData(credential);
      })
      .then(
        (success) => {
        this.router.navigate(['/content'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  ngOnInit() {
    this.login = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.maxLength(15), Validators.required])),
      password: new FormControl('',Validators.compose([Validators.maxLength(15), Validators.required])),
    }, {updateOn: 'submit'});
  }

}
