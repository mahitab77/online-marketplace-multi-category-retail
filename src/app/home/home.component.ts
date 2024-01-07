import { Component, OnInit } from '@angular/core';
import { ProductSrvService } from '../product-srv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductSrvService) {}

  ngOnInit(): void {
    this.productService.getproduct().subscribe((data) => {
      this.products = data;
    });
  }
}
