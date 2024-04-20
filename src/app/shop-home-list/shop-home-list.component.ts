import { Component, OnInit } from '@angular/core';
import { ProductSrvService } from '../product-srv.service';

@Component({
  selector: 'app-shop-home-list',
  templateUrl:'./shop-home-list.component.html',
  styleUrl: './shop-home-list.component.css'
})
export class ShopHomeListComponent implements OnInit{
  productColumns: any[] = [
    { title: "On Sale", products: [] },
    { title: "Best Seller", products: [] },
    { title: "Top Viewed", products: [] }
  ];

  constructor(private productService: ProductSrvService) {}

  ngOnInit() {
    // Fetch products from the API and shuffle them
    this.productService.getproduct().subscribe((products) => {
      const shuffledProducts = this.shuffleArray(products);

      // Split the shuffled products into 3 columns, each containing 3 products
      for (let i = 0; i < 3; i++) {
        const startIndex = i * 3;
        const endIndex = startIndex + 3;
        const columnProducts = shuffledProducts.slice(startIndex, endIndex);

        // Assign the column products to the corresponding column
        this.productColumns[i].products = columnProducts;
      }
    });
  }

  // Define the shuffleArray function
  private shuffleArray(array: any[]): any[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
}