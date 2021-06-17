import { TestBed } from '@angular/core/testing';

import { EtherPriceService } from './ether-price.service';

describe('EtherPriceService', () => {
  let service: EtherPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtherPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
