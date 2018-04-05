import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  name: string;

  constructor(public auth: AuthService, public afAuth: AngularFireAuth, private router: Router) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.name = auth.displayName;
      }
    });
  }

  ngOnInit() {
  }

}
