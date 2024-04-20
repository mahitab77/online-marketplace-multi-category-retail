import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BlogSingleSidebarComponent } from './blog-single-sidebar/blog-single-sidebar.component';
import { ChosenCategoryComponent } from './chosencategory/chosencategory.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'shop-grid', component: ShopGridComponent, data: { hideCategoriesHeader: true } },
  { path: 'chosencategory',component:ChosenCategoryComponent, data: { hideCategoriesHeader: true } },
  { path: 'checkout', component: CheckoutComponent, data: { hideCategoriesHeader: true } },
  { path: 'cart', component: ProductCartComponent, data: { hideCategoriesHeader: true } },
  { path: 'blog-single', component: BlogSingleSidebarComponent, data: { hideCategoriesHeader: true } },
  { path: 'product-details/:id', component: ProductDetailsComponent, data: { hideCategoriesHeader: true } },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactsComponent,data: { hideCategoriesHeader: true } },
  { path: 'search-results', component: SearchResultsComponent,data: { hideCategoriesHeader: true }  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home for any unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
