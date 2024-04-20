// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';
import { CartsrvService } from '../cartsrv.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  productDetails: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductSrvService,
    private Cartsrv: CartsrvService
  ) { }

  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const productId = +idParam;
        this.productService.getProductById(productId).subscribe(
          product => {
            if (product) {
              this.productDetails = product;
            } else {
              console.log('Product not found');
            }
          },
          error => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }
  addToCart(productsincart:Product){
    this.Cartsrv.addToCart(productsincart);
  }
}

