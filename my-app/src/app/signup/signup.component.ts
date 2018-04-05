import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private register: FormGroup;
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {

  }

  onSubmit(formData) {
    if (this.register.controls.email.valid == true && this.register.controls.password.valid == true) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.register.value['email'], this.register.value['password'])
        .then(
          (credential) => {
            console.log(credential);
            credential.updateProfile({
              displayName: this.register.value['name']
            })
          })
        .then(
          (success) => {
            console.log(success);
            this.router.navigate(['/login'])
          })
        .catch(
          (err) => {
            console.log(err);
            this.error = err;
          })
    }
  }

  ngOnInit() {
    this.register = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.maxLength(15), Validators.required])),
      password: new FormControl('', Validators.compose([Validators.maxLength(15), Validators.required])),
      name: new FormControl('', Validators.compose([Validators.maxLength(15), Validators.required])),
    }, { updateOn: 'submit' });
  }

}
