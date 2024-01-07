import { Component,OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';
import { CartsrvService } from '../cartsrv.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products! : Product[]
  
  constructor( private Productsrv  :ProductSrvService,private Cartsrv  :CartsrvService){}
   

  ngOnInit(): void {
    this.Productsrv.getproduct().subscribe((data :Product[]) =>{this.products=data });
  }

  addToCart(productsincart:Product){
    this.Cartsrv.addToCart(productsincart);
  }
}
