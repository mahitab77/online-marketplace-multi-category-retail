import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSrvService {
  private apiurl='http://fakestoreapi.com/products'

  constructor(private http : HttpClient) { }
  getproduct():Observable<Product[]>{
   return this.http.get<Product[]>(this.apiurl);
  }

  getProductById(productId: number): Observable<any> {
    console.log('Product ID in service:', productId); 
    return this.http.get<any>(`${this.apiurl}/${productId}`);
  }
  
  getProductsByCategory(category: string | null): Observable<Product[]> {
    // If no category is provided, return all products
    if (!category) {
      return this.getproduct();
    }

    // If a category is provided, filter products by category
    return this.http.get<Product[]>(`${this.apiurl}?category=${category}`);
  }
}
