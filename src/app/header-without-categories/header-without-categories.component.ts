import { Component,OnInit,Input } from '@angular/core';
import { CartsrvService } from '../cartsrv.service';
import { ProductSrvService } from '../product-srv.service';
import { CartCheckoutService } from '../cart-checkout.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-without-categories',
  templateUrl: './header-without-categories.component.html',
  styleUrl: './header-without-categories.component.css'
})
export class HeaderWithoutCategoriesComponent implements OnInit {

  @Input() showCategoriesHeader!: boolean;
  title = 'Shopping Website';
  itemcount!: number;
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | null = null;
  searchQuery: string = '';
  
  
  cartItems!:Product[];
  cartitemcount: number = 0;
  totalAmount: number = 0;
  quantities: Map<number, number> = new Map<number, number>();

  constructor(private router: Router,
     private cartService: CartsrvService,
     private productService: ProductSrvService,
     private checkoutService: CartCheckoutService) {}

  ngOnInit(): void {
    ///product service///
    this.productService.getproduct().subscribe((data) => {
      this.products = data;
      this.categories = [...new Set(data.map(product => product.category))];
    });

    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });

    ////////the cart service//////
      // Subscribe to cart data changes and update the properties
      this.cartService.currentCartData.subscribe((data) => {
        this.cartItems = data;
      });
  
      // Subscribe to item count changes
      this.cartService.cartItemCountObs$.subscribe((count) => {
        this.itemcount = count;
      });
  
      // Subscribe to total amount changes
      this.cartService.currentTotalAmount.subscribe((amount) => {
        this.totalAmount = amount;
      });
    }
  
    //this.cartService.currentCartData.subscribe(items => this.cartItems = items);
    //this.cartService.currentTotalAmount.subscribe(amount => this.totalAmount = amount);
  
  
 //////////////////////////////////////////////////////////////////////////////
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
 
  
  onCategorySelected(event: Event): void {
  const selectedCategory = (event.target as HTMLSelectElement).value;
  
  if (selectedCategory === 'All') {
    // Navigate to shop-grid without a category parameter
    this.router.navigate(['/shop-grid']);
  } else {
    // Navigate to chosencategory with the selected category as a parameter
    this.router.navigate(['/chosencategory'], { queryParams: { category: selectedCategory } });
  }
}
//////////////////////////////////////////////////////////////////////////// 
getQuantityFromComponent(productId: number): number {
  return this.cartService.getQuantity(productId);
}


remove(id:number){
    this.cartService.removeItem(id);
}
  
onCheckout(): void {
    const cartItems = this.cartService.getCartItems(); 
    this.checkoutService.updateCartData(cartItems);
}
/////////////////////////////////////////////////////////////////////////

  menuroute(category: string): void {
    console.log("Navigating to category:", category);
    this.router.navigate(['/chosencategory'], { queryParams: { category: category } });
  }
/////////////////////////////////////////////////////////////////////////
searchProducts(): void {
  this.productService.searchProducts(this.searchQuery).subscribe(() => {
    this.router.navigate(['/search-results']);
  });
}
}




