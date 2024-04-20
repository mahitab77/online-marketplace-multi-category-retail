import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product'; // Ensure this path matches your actual Product interface location

@Injectable({
  providedIn: 'root'
})
export class CartsrvService {
  private cartItems: Product[] = [];
  private cartData = new BehaviorSubject<Product[]>(this.cartItems);
  currentCartData = this.cartData.asObservable();

  private productQuantities: { [productId: number]: number } = {};
  private totalAmount = new BehaviorSubject<number>(0);
  currentTotalAmount = this.totalAmount.asObservable();

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCountObs$ = this.cartItemCount.asObservable();

  constructor() { }

  // Adds or updates a product in the cart
  addToCart(product: Product): void {
    try {
      const productId = product.id;
      if (this.productQuantities[productId]) {
        this.productQuantities[productId]++;
      } else {
        this.cartItems.push(product);
        this.productQuantities[productId] = 1;
      }
      this.updateCartState();
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      // Handle error appropriately (e.g., user notification, logging)
    }
  }
  ////////////////////////////////////////////////////////////////////////////// 
  getCartItems(): Product[] {
    return this.cartItems;
  }
  /////////////////////////////////////////////////////////////////////////////
  // Gets the quantity of a specific product in the cart
  getQuantity(productId: number): number {
    try {
      return this.productQuantities[productId] || 0;
    } catch (error) {
      console.error('Failed to get product quantity:', error);
      // Handle error appropriately, potentially returning 0 as a safe default
      return 0;
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  // Removes an item from the cart
  removeItem(productId: number): void {
    try {
      const index = this.cartItems.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        delete this.productQuantities[productId];
        this.updateCartState();
      } else {
        throw new Error('Product not found in cart');
      }
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  // Increments the quantity of a product in the cart
  incrementQuantity(productId: number): void {
    try {
      if (this.productQuantities[productId]) {
        this.productQuantities[productId]++;
        this.updateCartState();
      } else {
        throw new Error('Product not found in cart');
      }
    } catch (error) {
      console.error('Failed to increment product quantity:', error);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  // Decrements the quantity of a product in the cart
  decrementQuantity(productId: number): void {
    try {
      if (this.productQuantities[productId] && this.productQuantities[productId] > 1) {
        this.productQuantities[productId]--;
      } else {
        this.removeItem(productId); // Will also handle product not found error
        return;
      }
      this.updateCartState();
    } catch (error) {
      console.error('Failed to decrement product quantity:', error);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  // Clears the cart
  clearCart(): void {
    try {
      this.cartItems = [];
      this.productQuantities = {};
      this.updateCartState();
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  // Updates the state of the cart
  private updateCartState(): void {
    try {
      this.cartData.next(this.cartItems);
      this.updateTotalAmount();
      this.updateItemCount();
    } catch (error) {
      console.error('Failed to update cart state:', error);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  // Calculates the total cost of items in the cart.
  private calculateTotalAmount(): number {
  let total = 0;
  this.cartItems.forEach(item => {
    const quantity = this.productQuantities[item.id]; 
    total += item.price * quantity;
  });
  return total; // Returns the calculated total
}
//////////////////////////////////////////////////////////////////////////////
public getTotalAmount(): number {
  return this.calculateTotalAmount(); 
}
//////////////////////////////////////////////////////////////////////////////
// Updates the observable total amount based on the current cart items and their quantities.
public updateTotalAmount(): void {
  const total = this.calculateTotalAmount(); // Use the calculate method to get the total
  this.totalAmount.next(total); // Update the BehaviorSubject with the new total
}

///////////////////////////////////////////////////////////////////////////////
  // Updates the item count of the cart
  private updateItemCount(): void {
    try {
      let totalCount = 0;
      Object.values(this.productQuantities).forEach(quantity => {
        totalCount += quantity;
      });
      this.cartItemCount.next(totalCount);
    } catch (error) {
      console.error('Failed to update item count:', error);
    }
  }
}


  
