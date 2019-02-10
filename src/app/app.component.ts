import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthServiceService,private router:Router,private userService:UserService)
  {
    this.auth.user$.subscribe(user =>{
    if(user){
      userService.save(user);
      let returnUrl = localStorage.getItem('retUrl');
      this.router.navigateByUrl(returnUrl);
    }
  });
  }
}
