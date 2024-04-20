import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingleSidebarComponent } from './blog-single-sidebar.component';

describe('BlogSingleSidebarComponent', () => {
  let component: BlogSingleSidebarComponent;
  let fixture: ComponentFixture<BlogSingleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogSingleSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogSingleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
