import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsrvService {
  private cartitemcount =new BehaviorSubject<number>(0);
  cartitemcountobs$=this.cartitemcount.asObservable();
  cartitem:Product[]=[];

  constructor() { }

  getcartitem():Product[]{
    return this.cartitem;
  }

  addToCart(product:Product){
    this.cartitem.push(product);
    this.updatecount()
  }

  removeitem(id: number){
    const index=this.cartitem.findIndex((item=>item.id==id));
    this.cartitem.splice(index,1);
    this.updatecount()
  }

  updatecount(){
    this.cartitemcount.next(this.cartitem.length);
  }
}
