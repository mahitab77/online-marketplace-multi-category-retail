import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosencategoryComponent } from './chosencategory.component';

describe('ChosencategoryComponent', () => {
  let component: ChosencategoryComponent;
  let fixture: ComponentFixture<ChosencategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChosencategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChosencategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
