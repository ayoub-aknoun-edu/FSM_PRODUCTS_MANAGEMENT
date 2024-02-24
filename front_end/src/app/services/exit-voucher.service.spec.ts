import { TestBed } from '@angular/core/testing';

import { ExitVoucherService } from './exit-voucher.service';

describe('ExitVoucherService', () => {
  let service: ExitVoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExitVoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
