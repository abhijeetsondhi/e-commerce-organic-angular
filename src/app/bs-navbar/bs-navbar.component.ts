import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-users';
import { AuthServiceService } from './../auth-service.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  itemCount:number ;
  appUser: AppUser;
  cart$;
  temp;
  constructor(public afuth: AuthServiceService,private sc:ShoppingCartService) { 
    this.afuth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit()
  {
    let cart$ = await this.sc.getCart();
    this.itemCount=0;
    cart$.subscribe(c => 
      {
        this.itemCount=0;
        if(c.payload.val())
        {
          for(let id in c.payload.val().items)
          {
            this.itemCount += c.payload.val().items[id].quantity;
          }
        }
      });
  }

logout()
{
  this.afuth.logout();
}

}