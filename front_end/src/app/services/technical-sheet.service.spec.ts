import { TestBed } from '@angular/core/testing';

import { TechnicalSheetService } from './technical-sheet.service';

describe('TechnicalSheetService', () => {
  let service: TechnicalSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicalSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
