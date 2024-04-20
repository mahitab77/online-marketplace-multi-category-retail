import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBlogComponent } from './shop-blog.component';

describe('ShopBlogComponent', () => {
  let component: ShopBlogComponent;
  let fixture: ComponentFixture<ShopBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopBlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
