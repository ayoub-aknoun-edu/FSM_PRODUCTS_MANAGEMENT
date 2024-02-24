import { TestBed } from '@angular/core/testing';

import { ReleaseFormService } from './release-form.service';

describe('ReleaseFormService', () => {
  let service: ReleaseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
