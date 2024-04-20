import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product'; 
import { CartsrvService } from './cartsrv.service';

@Injectable({
  providedIn: 'root'
})
export class CartCheckoutService {

  // BehaviorSubjects to hold and emit changes in cart data, shipping inclusion, subtotal, and discounts
  private cartSource = new BehaviorSubject<Product[]>([]);
  currentCart = this.cartSource.asObservable();

  
  private includeShippingSource = new BehaviorSubject<boolean>(false);
  includeShipping = this.includeShippingSource.asObservable();

  private subtotal = new BehaviorSubject<number>(0);

  private couponDiscountSource = new BehaviorSubject<number>(0); // Track coupon discount

  
  


constructor(private cartService: CartsrvService) { }
  
  // 4 feb update
  // Method to set cart data
 // setCartData(data: any) {
  //  this.currentCart = data;
  //}

  // Method to get cart data
  getCartData() {
    return this.currentCart;
  }

  updateCartData(cartItems: Product[]): void {
    this.cartSource.next(cartItems);
    // Recalculate subtotal based on updated cart items and update the BehaviorSubject
    const newSubtotal = this.calculateSubTotal(); // Ensure this method calculates the subtotal correctly
    this.subtotal.next(newSubtotal);

  }
  

  calculateSubTotal(): number {
    // Directly return the total amount from CartService, assuming it calculates including quantities
    return this.cartService.getTotalAmount();
  }
////////////////////////////////////////////////////////////////////////////////////
setIncludeShipping(value: boolean): void {
  this.includeShippingSource.next(value); // Correctly use includeShippingSource here
  console.log("ya rab tani ")
}

getShippingCost(): number {
  const shippingCost = 10;
  
  // Condition 1 & 2: If checkbox is checked, shipping fees always apply
  if (this.includeShippingSource.value) {
    console.log("condition 1 or 2",shippingCost)
    return shippingCost;
  }
  
  // Condition 3: Checkbox is unchecked and total is more than $100, then shipping is $0
  if (!this.includeShippingSource.value && this.subtotal.value >= 100) {
    console.log("subtotal  in 3rd condition",this.subtotal.value)
    console.log(shippingCost)
    return 0; // Free shipping
  }

  // Condition 4: Remaining case, subtotal less than $100 and checkbox is unchecked
  console.log(" subtotal  in  4th condition",this.subtotal.value)
  console.log(shippingCost)
  return shippingCost; // Shipping fee applies
}

///////////////////////////////////////////////////////////////////////////////////
// Method to update the coupon discount
setCouponDiscount(discount: number): void {
  this.couponDiscountSource.next(discount);
}

//////////////////////////////////////////////////////////////////////////////////
  
  calculateTotal(): number {
    const subtotal=this.calculateSubTotal();
    let shippingCost = this.getShippingCost(); // Assume this method exists and calculates shipping based on the includeShipping flag and subtotal
    let couponDiscount = this.couponDiscountSource.value;
  
    let total = subtotal - couponDiscount; // Subtract coupon discount from subtotal
    if (this.includeShippingSource.value || subtotal < 100) {
      total += shippingCost; // Add shipping costs if applicable
    }
    console.log(shippingCost)
    console.log(Math.max(total, 0));
    return Math.max(total, 0); // Ensure the total is not negative
    
  }

}


