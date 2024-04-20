import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductSrvService) { }

  ngOnInit(): void {
    this.productService.searchResults$.subscribe(results => {
      this.products = results;
    });
  }

}
