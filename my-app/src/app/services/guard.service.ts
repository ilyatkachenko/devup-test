import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CanActivate, Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.authState
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
              if (!authenticated) {
                  this.router.navigate([ '/login' ]);
              }
            });
  }
}
