import { TestBed } from '@angular/core/testing';

import { EntryVoucherService } from './entry-voucher.service';

describe('EntryVoucherService', () => {
  let service: EntryVoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryVoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
