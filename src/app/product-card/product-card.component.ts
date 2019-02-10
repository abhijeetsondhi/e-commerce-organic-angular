import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product:Product;
@Input('shopping-cart') shoppingCart;
cart;
item;

  constructor(private sc:ShoppingCartService) {
  }

  addCart(key:string)
  { 
      this.cart = this.sc.getOrCreate();
      this.sc.addItem(key,this.cart.__zone_symbol__value);
  }

  getQuantity()
  {
    if(this.shoppingCart)
    {
      this.item = this.shoppingCart.items[this.product.title];
    }
    return this.item ? this.item.quantity : 0;

  }


  removeCart(key:string)
  {
    this.cart = this.sc.getOrCreate();
    this.sc.removeItem(key,this.cart.__zone_symbol__value);
    if(this.item.quantity === 0)
    {
      this.cart = this.sc.getOrCreate();
      this.sc.deleteItem(this.product.key,this.cart.__zone_symbol__value);
    }
  }

}
