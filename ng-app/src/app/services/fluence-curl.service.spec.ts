import { TestBed } from '@angular/core/testing';

import { FluenceCurlService } from './fluence-curl.service';

describe('FluenceCurlService', () => {
  let service: FluenceCurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FluenceCurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
