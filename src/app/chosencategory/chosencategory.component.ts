import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';

@Component({
  selector: 'app-chosencategory',
  templateUrl: './chosencategory.component.html',
  styleUrl: './chosencategory.component.css'
})

export class ChosenCategoryComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductSrvService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      console.log("Received category:", category); // Debugging line
      if (category) {
        this.selectedCategory = category;
        this.loadProductsByCategory(category);
      }
    });
  }

  loadProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe((data: Product[]) => {
      this.products = data;
    }, error => {
      console.error('Error loading products by category:', error);
    });
  }
}
