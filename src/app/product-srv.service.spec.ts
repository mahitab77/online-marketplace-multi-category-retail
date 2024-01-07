import { TestBed } from '@angular/core/testing';

import { ProductSrvService } from './product-srv.service';

describe('ProductSrvService', () => {
  let service: ProductSrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
