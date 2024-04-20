import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../product';
import { User } from '../user';
import { CartCheckoutService } from '../cart-checkout.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';


interface FormErrors {
  [key: string]: string;
}

interface ValidationMessages {
  [key: string]: { [rule: string]: string };
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit {


  includeShipping: boolean = false; 

  selectedpay: string = 'credit'; // Default selected value
   
  // User information form group
  checkoutuserForm!: FormGroup;

  //formErrors
  formErrors : FormErrors = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state:'',
    addressLine1: '',
    postalCode: ''
  };
  // Validation messages
  validationMessages: ValidationMessages = {
    firstName: {
      required: 'First name is required.',
    },
    lastName: {
      required: 'Last name is required.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email must be a valid email address.',
    },
    phoneNumber: {
      required: 'Telephone is required.',
      pattern: 'Telephone must be 10 digits.',
    },
    country:{
      required: 'Country is required.',
    } ,
    state:{
      required: 'State is required.',
    },
    addressLine1: {
      required: 'Address is required.',
    },
    postalCode: {
      required: 'Postcode is required.',
    }
  };
  cartItems: Product[] = [];
 // stage: 'enteringUserInfo' = 'enteringUserInfo';
  //showModal = false;

  cartSubTotal: number = 0;
  shippingCost: number = 0;
  cartTotal: number = 0;
  //currentUser: User;

  users: User[] = [];
  /*currentUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    stateDivision: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    companyName: '',
    createAccount: false 
  };*/
  
  constructor(
    private checkoutService: CartCheckoutService, 
    private dialog: MatDialog
  ) 
  {
    // Initialize the user information form
    this.checkoutuserForm = this.createUserForm();
   
  }


  ngOnInit() {
    // Subscribe to currentCart to update cart items and totals
    this.checkoutService.currentCart.subscribe(items => {
      this.cartItems = items;
      this.updateTotals();
      // Recalculate shipping cost whenever cart items change
      this.updateShippingCost();
    });
     
    // Subscribe to includeShipping to update the component's state and recalculate shipping cost
    this.checkoutService.includeShipping.subscribe(value => {
      this.includeShipping = value;
      // Recalculate shipping cost whenever the includeShipping option changes
      this.updateShippingCost();
    });
  }
  
  // Method to update shipping cost
  updateShippingCost() {
    this.shippingCost = this.checkoutService.getShippingCost();
    console.log(this.shippingCost);
  }
  
  
  createUserForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
      country: new FormControl('Egypt', Validators.required),
      stateDivision: new FormControl('',Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(''), // Optional field
      postalCode: new FormControl('', Validators.required),
      companyName: new FormControl('Microsoft'),
      createAccount: new FormControl(false) // Checkbox for creating an account
    });
      this.checkoutuserForm.valueChanges.subscribe(() => this.onValueChanges());
  }

  createPaymentMethodForm(): FormGroup {
    return new FormGroup({
      paymentMethod: new FormControl('check', Validators.required), // Default payment method is 'check'
      paypalEmail: new FormControl('', Validators.email), // PayPal email field
      codAgreed: new FormControl(false), // Cash on Delivery (COD) checkbox
    });
  }

  onValueChanges(): void {
    for (const field in this.formErrors) {
      // Clear current error message
      this.formErrors[field] = '';
      const control = this.checkoutuserForm.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit(): void {
    // Handle the submission of both userForm and paymentMethodForm here
    if (this.checkoutuserForm.valid) {
      // Both forms are valid, proceed with the checkout process
      console.log('User Data:', this.checkoutuserForm.value);
      // You can implement further logic for processing the checkout
    } else {
      console.error('Form(s) is/are not valid.');
    }
  }
 ////////////////////////////////////////////////////////////////////////////////////////////
  // Update cart totals
  updateTotals(): void {
    this.cartSubTotal = this.checkoutService.calculateSubTotal();
    this.cartTotal = this.checkoutService.calculateTotal();
    console.log(this.cartTotal);
  }

  //method for processing payment based on the selected method
  processPayment(): void {
    // Access the payment method from the form group
    const paymentMethod = this.checkoutuserForm.get('paymentMethod')?.value;
    console.log('Processing payment with method:', paymentMethod);
    // Continue your payment processing logic with the obtained value
  }
  
  // Check if the checkout process should be allowed (e.g., cart not empty)
  get isCheckoutAllowed(): boolean {
    return this.cartSubTotal > 0; 
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px', // Adjust width as needed
      data: { message: 'Do you Want to proceed with Payement?' } // Pass any data you want to the modal component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'proceed') {
        // Logic to proceed with payment
        console.log('Proceed with payment');
      } else {
        // Logic to cancel
        console.log('Cancel payment');
      }
    });
  }
///////////////////////////////////////////////////////////////////////////////////////
}
  
  
  

  
  
 
 

  

  

  

  

  



