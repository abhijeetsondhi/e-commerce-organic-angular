import { ShoppingCartItem } from './shopping-item';

export class ShoppingCart {
  constructor(public key: string, public items: ShoppingCartItem[]){}

get totalItems() {
        let count=0;
        for(let id in this.items)
          {
            count += this.items[id].quantity;
          }
          return count;
    }

}