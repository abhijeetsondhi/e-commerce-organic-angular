import { ShoppingCartService } from './../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from './../categories.service';
import { ProductServiceService } from './../product-service.service';
import { Component, OnInit, Directive, Output, EventEmitter, Input } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
product:any[]=[];
newProduct:Product[]=[];
filteredProduct:Product[] = [];
categories;
subscription: Subscription;
temp:Product;
name:string;
quantity:any[]=[];
cart:any;
itemCount:number =0;
  constructor(
    private ps:ProductServiceService,
    private cat:CategoriesService,
    private act:ActivatedRoute,
    private sc:ShoppingCartService) { 
    this.subscription = this.ps.getAll().subscribe(product => 
      {
        this.product = product;
        this.product.filter(p =>
        {
          this.newProduct.push(p.payload.val());
          this.temp = this.newProduct.find(i => i.title === p.payload.val().title);
          this.temp.key = p.key;
        });
      });


      act.queryParamMap.subscribe(params => {this.name = params.get('categories');
    this.filteredProduct = (this.name) ? 
    this.newProduct.filter(p => p.categories === this.name) : this.newProduct;
    });
    this.cat.temp().subscribe(c => this.categories = c);
  }

  async ngOnInit()
  {
    (await this.sc.getCart()).subscribe(c => 
      {
        this.cart = c.payload.val();
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
