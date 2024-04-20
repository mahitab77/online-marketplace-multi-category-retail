import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomequickshopModalComponent } from './homequickshop-modal.component';

describe('HomequickshopModalComponent', () => {
  let component: HomequickshopModalComponent;
  let fixture: ComponentFixture<HomequickshopModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomequickshopModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomequickshopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
