import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
products$;
  constructor(private db:AngularFireDatabase) { }

createProd(product:any)
{
  return this.db.list('/products').push(product);
}

getAll()
{
  return this.db.list('/products').snapshotChanges();
}

retrieve(productId)
{
  return this.db.object('/products/' + productId).snapshotChanges();
}

update(prodId,prod)
{
  return this.db.object('/products/'+ prodId).update(prod);
}

delete(prodId)
{
    this.db.object('/products/'+ prodId).remove();
}
}
