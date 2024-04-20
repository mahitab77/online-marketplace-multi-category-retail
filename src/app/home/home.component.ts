import { Component, OnInit,ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';
import { CartsrvService } from '../cartsrv.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX({{ from }}%)' }),
        animate('300ms ease-out', style({ transform: 'translateX({{ to }}%)' })),
      ]),
    ]),
  ],
})export class HomeComponent implements OnInit{

  products: Product[] = [];
  selectedProductId: number | null = null;

  smallBannerImages: { category: string; imageUrl: string }[] = [];
  bestRatedProducts: Product[] = [];
  carouselOptions: OwlOptions = {
    items: 4,
    dots: true,
    nav: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
  };

  @ViewChild('owlCarousel') owlCarousel!: CarouselComponent;
  prev(owlCarousel: CarouselComponent): void {
    owlCarousel.prev();
  }
  next(owlCarousel: CarouselComponent): void {
    owlCarousel.next();
  }


  constructor(private Productsrv: ProductSrvService, private Cartsrv: CartsrvService) {}

  ngOnInit(): void {

    // Fetch all products
    this.Productsrv.getproduct().subscribe((data: Product[]) => {
    this.products = data;

    // Set best-rated products for the carousel
    this.setBestRatedProducts();

    // Fetch small banner images
    forkJoin([
        this.fetchFirstImageByCategory('jewelery'),
        this.fetchFirstImageByCategory('men'),
        this.fetchFirstImageByCategory('women'),
      ]).subscribe(() => {
      });
    });
  }

  

  setBestRatedProducts() {
    // Sort products by rating in descending order and select the top 4
    this.bestRatedProducts = [...this.products] // Create a copy to avoid mutating the original array
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 4);
  
    // Label the first product as 'Hot'
    if (this.bestRatedProducts.length > 0) {
      this.bestRatedProducts[0].isHot = true;
    }
  
    // Find and label the lowest-rated among the top 4 as 'New'
    let lowestRatedProduct = this.bestRatedProducts.reduce((prev, curr) => 
      (prev.rating.rate < curr.rating.rate) ? prev : curr, this.bestRatedProducts[0]);
    lowestRatedProduct.isNew = true;
  
    // Apply discount to products with price between $150 and $160
    this.bestRatedProducts.forEach(product => {
      if (product.price >= 150 && product.price <= 160) {
        product.oldPrice = product.price; // Store the original price as oldPrice
        product.price *= 0.7; // Apply 30% discount
        product.hasDiscount = true;
      } else {
        product.hasDiscount = false;
      }
    });
  }
  
  

//fetching images by category 
  fetchFirstImageByCategory(keyword: string) {
    return this.Productsrv.getproduct().pipe(
      map((products) => {
        const matchingProduct = products.find((product) =>
          product.category.toLowerCase().includes(keyword)
        );
        if (matchingProduct) {
          this.smallBannerImages.push({
            category: matchingProduct.category,
            imageUrl: matchingProduct.image,
          });
        }
      })
    );
  }

  getBannerImageUrl(category: string): string | undefined {
    const banner = this.smallBannerImages.find((item) =>
      item.category.toLowerCase().includes(category)
    );
    return banner ? banner.imageUrl : undefined;
  }
  ////////////////////////////////////////
  //send product data to modal
  selectProductId(productId: number) {
    this.selectedProductId = productId;
  }
  ////////////////////////////////////////
  addToCart(productsincart: Product) {
    this.Cartsrv.addToCart(productsincart);
  }

}