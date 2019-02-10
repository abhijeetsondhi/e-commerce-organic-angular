import { Product } from './../models/product';
import { ShoppingCartItem } from './../models/shopping-item';
import { ProductServiceService } from './../product-service.service';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Productss } from '../models/prod';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$;
prod:any[] = [];
prods:any[]=[];
prds:any[]=[];
items:Product[]=[];
temp;
count=0;
price:number[]=[];
product = {
  title: 'te,p',
  quantity:4,
  price : 0
} ;


  constructor(private sc:ShoppingCartService,private ps:ProductServiceService) { 
    this.count=0;
  }

  async ngOnInit()
  {
    this.cart$ = await this.sc.getCart();
    this.cart$.subscribe(c =>
       {
          for(let i in c.payload.val().items)
          {
            this.product = {
              title: 'te,p',
              quantity:4,
              price:0
            } ;
              this.product.title = i;
              this.product.quantity = c.payload.val().items[i].quantity;
              this.product.price= this.getPrice(this.product.title)[this.count];
              
              this.prods.push(this.product);
              this.count++;
          }

    });
  }


  async getPrice(name:string)
  {
    await this.ps.getAll().map(product => 
      {
        this.prds = product;
        this.prds.filter(p =>
        {
          this.items.push(p.payload.val());
          this.temp = this.items.find(i => i.title === p.payload.val().title);
          this.temp.key = p.key;
        });
        let prices = this.items.find(i => i.title === name);
        this.price.push(prices.price);
        console.log(this.price);
        this.delay(2000);
           return this.price;
      });
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
}
