import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private aut: AuthServiceService,private router: Router)
  {

  }
  canActivate(route, state:RouterStateSnapshot)
  {
    return this.aut.user$.map(user => { 
      if (user) return true;
        this.router.navigate(['\login'],{ queryParams:{returnUrl:state.url }});
      return false;
    }); 
  }

 

}
