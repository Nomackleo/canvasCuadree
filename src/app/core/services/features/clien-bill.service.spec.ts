import { TestBed } from '@angular/core/testing';

import { ClienBillService } from './clien-bill.service';

describe('ClienBillService', () => {
  let service: ClienBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
