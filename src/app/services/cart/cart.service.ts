import { Injectable } from '@angular/core';
import { CarDetail } from 'src/app/models/car/car-detail';
import { CartItem } from 'src/app/models/cart/cart-item';
import { CartItems } from 'src/app/models/cart/cart-items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  onstructor() { }

  addToCart(car:CarDetail) {

    let item = CartItems.find(c => c.car.carId===car.carId)

    if(item) {
      item.quantity += 1;
    }
    else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.quantity = 1
      CartItems.push(cartItem);
    }

  }

  removeFromCart(car:CarDetail){
    let item:any = CartItems.find(c=>c.car.carId===car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  listCart():CartItem[] {
    return CartItems;
  }

}
