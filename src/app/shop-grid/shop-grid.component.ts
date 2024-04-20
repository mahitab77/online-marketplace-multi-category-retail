import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductSrvService } from '../product-srv.service';
import { CartsrvService } from '../cartsrv.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-shop-grid',
  templateUrl:'./shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})

export class ShopGridComponent implements OnInit {
  // Initialize variables for price range counts, products, filters, and more
  priceRangeCounts = {
    '20-50': 0,
    '50-100': 0,
    '100-250': 0
  };
  products: Product[] = [];  // All products retrieved from the service
  filteredProducts: Product[] = [];  // Products after applying filters
  categories: string[] = [];  // Categories for filtering products
  selectedCategory: string | null = null;
  //displayedProducts: Product[] = [];
  manufacturerFilter: string | null = null;
  priceRangeFilters: { min: number; max: number }[] = [];  // Array to store active price range filters
  priceRangeInput: string = '';  // Input string for custom price range
  value: number = 120;  // Lower value for the price range slider
  highValue: number = 250;  // Upper value for the price range slider
  itemsToShow: number = 9;  // Number of items to show, used for pagination-like feature

  viewMode: 'list' | 'grid' = 'grid';  // Current view mode (list or grid)
  sortBy: string = 'title';  // Current sorting criterion

  // Options for the ngx-slider
  options: Options = {
    floor: 120,
    ceil: 250 
  };

  constructor(private productService: ProductSrvService,private cartsrv: CartsrvService ) {}

  ngOnInit(): void {
    // Fetch products from the service on component initialization
    this.productService.getproduct().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data;
      this.categories = Array.from(new Set(data.map(product => product.category)));
      this.priceRangeInput = `$${this.value} - $${this.highValue}`;
      this.calculatePriceRangeCounts();
      //this.applyCombinedFilters(); // Apply filters after loading products
    });
  }
  
  // Getter for displayedProducts to slice filteredProducts based on itemsToShow
  get displayedProducts(): Product[] {
    return this.filteredProducts.slice(0, this.itemsToShow);
  }
  
  // Method to filter products by category
  filterProductsByCategory(category: string): void {
    this.filteredProducts = (category === 'All') ? this.products :
                            this.products.filter(product => product.category === category);
  }

  // Method to filter products by manufacturer
  filterProductsByManufacturer(manufacturer: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(manufacturer.toLowerCase()));
  }



  // Method to handle custom price range input
  filterProductsByCustomPrice(): void {
    const priceRange = this.priceRangeInput.split('-').map(value =>
      parseInt(value.trim().replace('$', ''), 10));
    if (priceRange.length === 2) {
      this.value = priceRange[0];
      this.highValue = priceRange[1];
      this.applyPriceRangeFilters();
    }
  }


  // Method to apply price range filters based on slider values
  applyPriceRangeFilters(): void {
    this.filteredProducts = this.products.filter(product =>
      product.price >= this.value && product.price <= this.highValue);
  }



  // Method to handle changes in the slider for price range
  onUserChangeEnd(): void {
    this.priceRangeInput = `$${this.value} - $${this.highValue}`;
    this.applyPriceRangeFilters();
  }



  // Method to filter products by predefined price ranges (checkbox filters)
  filterProductsByPriceRange(minPrice: number, maxPrice: number, event: Event): void {

    // Perform type assertion
    const input = event.target as HTMLInputElement;

    const isChecked = input.checked;
    const index = this.priceRangeFilters.findIndex(filter =>
      filter.min === minPrice && filter.max === maxPrice);
    if (isChecked && index === -1) {
      this.priceRangeFilters.push({ min: minPrice, max: maxPrice });
    } else if (!isChecked && index !== -1) {
      this.priceRangeFilters.splice(index, 1);
    }
    this.applyCombinedFilters();
  }

  
  
  // Method to sort products based on the selected criterion
  sortProducts(): void {
    if (this.sortBy === 'title') {
      this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'price') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'rating') {
      this.filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  }


  
  calculatePriceRangeCounts(): void {
    this.priceRangeCounts['20-50'] = this.products.filter(p => p.price >= 20 && p.price <= 50).length;
    this.priceRangeCounts['50-100'] = this.products.filter(p => p.price >= 50 && p.price <= 100).length;
    this.priceRangeCounts['100-250'] = this.products.filter(p => p.price >= 100 && p.price <= 250).length;
  }



  // Method to apply all active filters (category, manufacturer, and price range)
  applyCombinedFilters(): void {
    this.filteredProducts = this.products;
    //...
    // Apply price range filters
    if (this.priceRangeFilters.length > 0) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        this.priceRangeFilters.some(filter =>
          product.price >= filter.min && product.price <= filter.max));
    }
  }



  // Method to update displayed products (useful for triggering change detection)
  updateDisplayedProducts(): void {
   
  }

  addToCart(product: Product): void {
    console.log('Product to add:', product);
    this.cartsrv.addToCart(product);
  }

}
