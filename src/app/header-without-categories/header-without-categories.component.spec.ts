import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithoutCategoriesComponent } from './header-without-categories.component';

describe('HeaderWithoutCategoriesComponent', () => {
  let component: HeaderWithoutCategoriesComponent;
  let fixture: ComponentFixture<HeaderWithoutCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderWithoutCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderWithoutCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
