import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject, snapshotChanges } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/first';
import { ShoppingCart } from './models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  value$;
  constructor(private db:AngularFireDatabase) { }

  addItem(key:string,cartId:string)
  {
    let item: AngularFireObject<{}> = this.db.object("/shopping-cart/" + cartId + "/items/" + key);
    let itemSnap$ = item.snapshotChanges();
    itemSnap$.take(1).subscribe((data: any) => {
      let prod = { key: data.payload.key, ...data.payload.val() };
      let exists: boolean = data.payload.val() !== null;
      if (exists) {
        item.update({ quantity: prod.quantity + 1 });
      }
      else {
        item.set({ quantity: 1 });
      }
    });

  }

  async getOrCreate()
  {
    let id = localStorage.getItem('id');
    if(!id)
    {
      let result = await this.create();
      localStorage.setItem('id',result.key);
        return result.key;
    }
    else
      return id;
  }

  async getCart()
  {
    let cartId = await this.getOrCreate();
    return this.db.object('/shopping-cart/' + cartId).snapshotChanges();
  }

  create()
  {
    return this.db.list('/shopping-cart/').push({
      dateCreated:new Date().getTime()
    });
  }

 getItemFromCart(cartId,prod)
  {
    return this.db.list("/shopping-cart/" + cartId + "/items/" + prod).valueChanges().first();
  }

  deleteItem(key:string,cartId:string)
  {
    console.log("remove");
    this.db.object("/shopping-cart/" + cartId + "/items/" + key).remove();
  }




  removeItem(key:string,cartId:string)
  {
    let item1: AngularFireObject<{}> = this.db.object("/shopping-cart/" + cartId + "/items/" + key);
    let itemSnap1$ = item1.snapshotChanges();
    itemSnap1$.take(1).subscribe((data: any) => {
      let prod1 = { key: data.payload.key, ...data.payload.val() };
      let exists: boolean = data.payload.val() !== null;
      if (exists) {
        item1.update({ quantity: prod1.quantity - 1 });
      }
      else {
        item1.set({ quantity: 1 });
      }
    });

  }
}
