import { TestBed, inject } from '@angular/core/testing';

import { WindowServiceForScrollService } from './window-service-for-scroll.service';

describe('WindowServiceForScrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowServiceForScrollService]
    });
  });

  it('should be created', inject([WindowServiceForScrollService], (service: WindowServiceForScrollService) => {
    expect(service).toBeTruthy();
  }));
});
