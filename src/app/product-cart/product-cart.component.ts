import { Component,OnInit } from '@angular/core';
import { CartsrvService } from '../cartsrv.service';
import { Router } from '@angular/router';
import { CartCheckoutService } from '../cart-checkout.service';
import { Product } from '../product';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent implements OnInit{
  
  cartItems: Product[] = [];
  subtotal: number = 0;
  ///////////////////////////////////
  includeShipping!: boolean;
  shippingCost: number = 10; // Default shipping cost
  ///////////////////////////////////
  couponDiscount: number = 0; // Discount value from the coupon
  couponCodeCorrect:boolean=false;

  private cartSubscription!: Subscription;

  constructor(private cartCheckoutService: CartCheckoutService, private cartService: CartsrvService, private router: Router ) { }
  
  ngOnInit(): void {
    this.updateCartItems();
    this.cartSubscription = this.cartService.cartItemCountObs$.subscribe(() => {
      this.updateCartItems();
    });
  }
  
  
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateSubtotal();
  }

  getQuantity(product: Product): number {
    return this.cartService.getQuantity(product.id);
  }

  incrementQuantity(product: Product): void {
    this.cartService.incrementQuantity(product.id);
    this.updateCartItems();
  }

  decrementQuantity(product: Product): void {
    this.cartService.decrementQuantity(product.id);
    this.updateCartItems();
  }

  
  removeFromCart(productId: number): void {
    this.cartService.removeItem(productId);
    this.updateCartItems();
  }
  clearCart(): void {
    this.cartService.clearCart();
  }

  calculateSubtotal(): void {
   this.subtotal = this.cartItems.reduce((total, item) => total + (item.price * this.getQuantity(item)), 0);
  }
  /////////////////////////////////////////////////////////////////////////////
 
  onCheckboxChange(event: Event): void {

    const input = event.target as HTMLInputElement;
    this.includeShipping = input.checked;
    this.cartCheckoutService.setIncludeShipping( this.includeShipping);
  }

  shouldApplyShipping(): boolean {
    return this.includeShipping || this.subtotal < 100;
    }
  ///////////////////////////////////////////////////////////////////////////
  applyCoupon(couponCode: string): void {

    //setting a fixed discount if the coupon code matches
    if (couponCode === 'SPECIAL10') {
      this.cartCheckoutService.setCouponDiscount(10); // Set a fixed discount for the example
      this.couponCodeCorrect = true; // Indicate correct coupon code
      this.couponDiscount = 10;
    } else {
      this.cartCheckoutService.setCouponDiscount(0); // No discount or coupon is invalid
      this.couponCodeCorrect = false; // Reset if the coupon code is incorrect
    }
  }
  
  couponCodeapplied(couponCode: string): void{
    if (couponCode === 'SPECIAL10') {
    
      this.couponCodeCorrect = true; // Indicate correct coupon code
     
    } else {
     
      this.couponCodeCorrect = false; // Reset if the coupon code is incorrect
    }
  }

  calculateSavings(): number {
    let savings = this.couponDiscount;
    if (!this.shouldApplyShipping()) {
      savings += this.shippingCost; // Add shipping cost savings if shipping is not applied.
    }
    return savings;
  }
  ///////////////////////////////////////////////////////////////////////////
  getTotal(): number {
    // Start with the subtotal of all items in the cart
    let total = this.subtotal - this.couponDiscount;
  
    // Check if shipping should be applied
    // Shipping fees apply if the checkbox is checked or the total amount is less than $100
    if (this.includeShipping || this.subtotal < 100) {
      total += this.shippingCost; // Add shipping costs if applicable
    }
  
    // Ensure total is never negative
    return Math.max(total, 0);
  }

 /* getTotal(): number {
    let total = this._subtotal.value - this.couponDiscount;
    if (this.includeShipping || this._subtotal.value < 100) {
      total += this.shippingCost;
    }
    const finalTotal = Math.max(total, 0); // Ensure total is never negative
    this._total.next(finalTotal); // Update the BehaviorSubject with the new total
    return finalTotal; // Return the calculated total
  }*/
   
  onCheckout(): void {
  const cartItems = this.cartService.getCartItems(); // Assuming this method exists and returns the cart items
  this.cartCheckoutService.updateCartData(cartItems);
}


}

