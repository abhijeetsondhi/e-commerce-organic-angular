import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthServiceService } from './auth-service.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth:AuthServiceService,private userService:UserService) { }
  canActivate(): Observable<boolean> {
  return this.auth.appUser$.map(appUser => appUser.isAdmin)
    }
}
