  import { Component, OnInit } from '@angular/core';
  import { CartsrvService } from './cartsrv.service';
  import { ProductSrvService } from './product-srv.service';
  import { Product } from './product';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    title = 'Shopping Website';
    itemcount!: number;
    products: Product[] = [];
    categories: string[] = [];
    selectedCategory: string | null = null;
  
    constructor(private cartService: CartsrvService, private productService: ProductSrvService) {}
  
    ngOnInit(): void {
      this.cartService.cartitemcountobs$.subscribe((count) => {
        this.itemcount = count;
      });
  
      this.productService.getproduct().subscribe((data) => {
        this.products = data;
        this.categories = [...new Set(data.map(product => product.category))];
      });
    }
  
    sortProducts(sortBy: string): void {
      if (sortBy === 'price') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'title') {
        this.products.sort((a, b) => a.title.localeCompare(b.title));
      }
    }
  
    filterProductsByCategory(category: string | null): void {
      this.selectedCategory = category;
      this.productService.getProductsByCategory(category).subscribe((filteredProducts) => {
        // Handle the filtered products as needed
        this.products = filteredProducts;
      });
    }
  }
  