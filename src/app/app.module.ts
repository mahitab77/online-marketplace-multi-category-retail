import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { NgxSliderModule } from 'ngx-slider-v2';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header/header.component';
import { FilterByCategoryPipe } from './filter-by-category.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopHomeListComponent } from './shop-home-list/shop-home-list.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { FooterComponent } from './footer/footer.component';
import { ShopBlogComponent } from './shop-blog/shop-blog.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderWithoutCategoriesComponent } from './header-without-categories/header-without-categories.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { BlogSingleSidebarComponent } from './blog-single-sidebar/blog-single-sidebar.component';
import { ChosenCategoryComponent } from './chosencategory/chosencategory.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from './modal/modal.component';
import { ShopServicesComponent } from './shop-services/shop-services.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HomequickshopModalComponent } from './home/homequickshop-modal/homequickshop-modal.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCartComponent,
    ProductDetailsComponent,
    HomeComponent,
    ContactsComponent,
    HeaderComponent,
    FilterByCategoryPipe,
    ShopHomeListComponent,
    NewsletterComponent,
    FooterComponent,
    ShopBlogComponent,
    ShopGridComponent,
    CheckoutComponent,
    HeaderWithoutCategoriesComponent,
    ProductModalComponent,
    BlogSingleSidebarComponent,
    ChosenCategoryComponent,
    ModalComponent,
    ShopServicesComponent,
    SearchResultsComponent,
    HomequickshopModalComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    CarouselModule,
    NgxSliderModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
