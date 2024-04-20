import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';
import { CartsrvService } from '../cartsrv.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = []; 
  productDetails:any;

  constructor(
    private productsrv: ProductSrvService, 
    private route: ActivatedRoute,
    private cartsrv: CartsrvService) {}

    ngOnInit(): void {
      
      this.route.paramMap.subscribe(params => {
        const categoryId = params.get('categoryId');
        if (categoryId) {
          this.loadProductsByCategory(categoryId);
        } else {
          this.loadAllProducts();
        }
      });
    }
  
  loadProductsByCategory(categoryId: string): void {
      this.productsrv.getProductsByCategory(categoryId).subscribe((data: Product[]) => {
        this.products = data;
        this.setCategories();
        this.categories.forEach(category => this.applyLabels(category));
      });
    }
  
  loadAllProducts(): void {
      this.productsrv.getproduct().subscribe((data: Product[]) => {
        this.products = data;
        this.setCategories();
        this.categories.forEach(category => this.applyLabels(category));
      });
    }
  setCategories(): void {
    // Extract categories from products
    this.categories = [...new Set(this.products.map(product => product.category))];
  }

  applyLabels(category: string): void {
    // Filter products by category
    let categoryProducts = this.products.filter(product => product.category === category);

    // Reset labels for this category
    categoryProducts.forEach(product => {
      product.isNew = false;
      product.isHot = false;
      product.hasDiscount = false;
    });

    // Apply labels within this category
    if (categoryProducts.length > 0) {
      let highestRatedProduct = categoryProducts.reduce((prev, curr) => (prev.rating.rate > curr.rating.rate) ? prev : curr);
      highestRatedProduct.isHot = true;

      let lowestRatedProduct = categoryProducts.reduce((prev, curr) => (prev.rating.rate < curr.rating.rate) ? prev : curr);
      lowestRatedProduct.isNew = true;

      let cheapestProduct = categoryProducts.reduce((prev, curr) => (prev.price < curr.price) ? prev : curr);
      cheapestProduct.hasDiscount = true;
    }
  }
  
  calculateDiscountedPrice(product: Product): number {
    return product.hasDiscount ? product.price * 0.7 : product.price;
  }
  
  getCheapestProducts(): Product[] {
    // Sort the products by price in ascending order
    const sortedProducts = [...this.products].sort((a, b) => a.price - b.price);
    // Take the first 8 products (cheapest)
    return sortedProducts.slice(0, 8);
  }

 
  addToCart(product: Product): void {
    this.cartsrv.addToCart(product);
  }
    
}
