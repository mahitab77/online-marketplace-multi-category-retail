import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject, Observable, forkJoin, of} from 'rxjs';
import { map, catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductSrvService {
  //private apiurl='http://fakestoreapi.com/products'
  private localDataUrl = 'assets/t-data.json';
  private localDataUrls = 'assets/s-data.json';

  private selectedCategorySubject = new BehaviorSubject<string | null>(null);

  private searchResultsSubject = new BehaviorSubject<Product[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();
  
  constructor(private http : HttpClient) { }
  

  getproduct(): Observable<Product[]> {
    // Fetch products from the API
   // const apiProducts = this.http.get<Product[]>(this.apiurl);
   const apiProducts = this.http.get<{ products: Product[] }>(this.localDataUrls).pipe(
    map(data => data.products)
  ); 

    // Fetch local JSON data
    const localProducts = this.http.get<{ products: Product[] }>(this.localDataUrl).pipe(
      map(data => data.products)
    );

    // Combine both sets of data
    return forkJoin([apiProducts, localProducts]).pipe(
      map(([apiProducts, localProducts]) => [...apiProducts, ...localProducts])
    );
  }

  getProductById(productId: number): Observable<Product | undefined> {
    // Fetch product from API
    //const apiProduct = this.http.get<Product>(`${this.apiurl}/${productId}`);
    const apiProduct =this.http.get<{ products: Product[] }>(this.localDataUrls).pipe(
                      map(data => data.products.find(product => product.id === productId))
    );
  
    // Fetch all products from local JSON and find the one with the matching ID
    const localProduct = this.http.get<{ products: Product[] }>(this.localDataUrl).pipe(
      map(data => data.products.find(product => product.id === productId))
    );
  
    // Combine and return the first found product
    return forkJoin([apiProduct, localProduct]).pipe(
      map(([apiProd, localProd]) => apiProd || localProd)
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  searchProducts(query: string): Observable<Product[]> {
    if (!query.trim()) {
      // if no search term, return empty product array.
      return of([]);
    }
  
    // Fetch and filter products from the API
    /*const apiProducts = this.http.get<Product[]>(this.apiurl).pipe(
      map(products => products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))),
      catchError(error => {
        console.error(error);
        return of([] as Product[]);
      })
    );*/
    const apiProducts=this.http.get<{ products: Product[] }>(this.localDataUrls).pipe(
      map(data => data.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))),
      catchError(error => {
        console.error(error);
        return of([] as Product[]);
      })
    );
  
    // Fetch and filter local JSON data
    const localProducts = this.http.get<{ products: Product[] }>(this.localDataUrl).pipe(
      map(data => data.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))),
      catchError(error => {
        console.error(error);
        return of([] as Product[]);
      })
    );
  
    // Combine both sets of filtered data and update the search results subject
    return forkJoin([apiProducts, localProducts]).pipe(
      map(([apiProducts, localProducts]) => {
        const combinedResults = [...apiProducts, ...localProducts];
        this.searchResultsSubject.next(combinedResults); // Update the BehaviorSubject with the new results
        return combinedResults;
      })
    );
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////
  getSelectedCategory(): Observable<string | null> {
    return this.selectedCategorySubject.asObservable();
  }
  ///////
  setSelectedCategory(category: string | null): void {
    this.selectedCategorySubject.next(category);
  }
  /////
  getCategories(): Observable<string[]> {
    return this.getproduct().pipe(
      map(products => [...new Set(products.map(product => product.category))])
    );
  }
  ////////////////////////////////////////////////////////////////////////////////
  getProductsByCategory(category: string | null): Observable<Product[]> {
    if (!category) {
      return this.getproduct();
    }
  
    // Fetch products from the API
   /* const apiProducts = this.http.get<Product[]>(this.apiurl).pipe(
      map(products => products.filter(product => product.category === category))
    );*/
    const apiProducts=this.http.get<{ products: Product[] }>(this.localDataUrls).pipe(
      map(data => data.products.filter(product => product.category === category))
    );
    // Fetch local JSON data and filter by category
    const localProducts = this.http.get<{ products: Product[] }>(this.localDataUrl).pipe(
      map(data => data.products.filter(product => product.category === category))
    );
  
    // Combine both sets of filtered data
    return forkJoin([apiProducts, localProducts]).pipe(
      map(([apiProducts, localProducts]) => [...apiProducts, ...localProducts])
    );
  }
  
//////////////////////
  getFirstProductByCategory(category: string): Observable<Product | undefined> {
    return this.http.get<Product[]>(`${this.localDataUrls}?category=${category}&limit=1`).pipe(
      map(products => (products.length > 0 ? products[0] : undefined))
    );
  }

}
  