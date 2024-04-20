import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../product';
import { ProductSrvService } from '../../product-srv.service';
import { CartsrvService } from '../../cartsrv.service';
@Component({
  selector: 'app-homequickshop-modal',
  templateUrl: './homequickshop-modal.component.html',
  styleUrl: './homequickshop-modal.component.css'
})
export class HomequickshopModalComponent implements OnChanges {
  @Input() productId: number | null = null;
  product: Product | null = null;

  constructor(private productService: ProductSrvService,
    private Cartsrv: CartsrvService ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && this.productId) {
      this.fetchProduct(this.productId);
    }
  }

  private fetchProduct(productId: number) {
    this.productService.getproduct().subscribe(products => {
      this.product = products.find(p => p.id === productId) || null;
    });
  }
  addToCart(productsincart: Product) {
    this.Cartsrv.addToCart(productsincart);
  }
}
