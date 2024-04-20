import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: any[], category: string): any[] {
   
    if (!products || !category) {
      return products;
    }

    const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    return filteredProducts;
  }
}
