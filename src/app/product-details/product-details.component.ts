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
      // Get the productId from the route parameters
      const idParam = params.get('id');

      // Check if idParam is not null before attempting conversion
      if (idParam !== null) {
        // Convert the string to a number
        this.productId = +idParam;
        console.log('Product ID:', this.productId);

        // Fetch the product details using the service
        this.productService.getProductById(this.productId)?.subscribe(data => {
          this.productDetails = data;
        });
      } else {
        console.error('Product ID is null.');
      }
    });
  }
  addToCart(productsincart:Product){
    this.Cartsrv.addToCart(productsincart);
  }
}