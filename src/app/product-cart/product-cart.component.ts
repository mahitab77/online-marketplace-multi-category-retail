import { Component,OnInit } from '@angular/core';
import { CartsrvService } from '../cartsrv.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent implements OnInit{
  
  cartitem!:Product[];
  itemcount!:number;

  constructor(private cartserv :CartsrvService){}

  ngOnInit(): void {
    this.cartserv.cartitemcountobs$.subscribe((count)=>{this.itemcount=count});
    this.cartitem=this.cartserv.getcartitem();
  }
 
  remove(id:number){
    this.cartserv.removeitem(id);
  }
}
