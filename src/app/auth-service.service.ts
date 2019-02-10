import { UserService } from './user.service';
import { AppUser } from './models/app-users';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user$: Observable<firebase.User>;

  constructor(public afauth: AngularFireAuth,private route : ActivatedRoute,private userService:UserService) {

    this.user$ = this.afauth.authState;
   }

  login()
  {
    let retUrl = this.route.snapshot.queryParamMap.get('returnUrl')
    localStorage.setItem('retUrl',retUrl);
    return this.afauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout()
  {
    return this.afauth.auth.signOut();
  }


  get appUser$() : Observable<AppUser>
  {
    return this.user$.switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();

      return Observable.of(null);
  });
}
  
}
