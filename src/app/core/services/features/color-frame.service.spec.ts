import { TestBed } from '@angular/core/testing';

import { ColorFrameService } from './color-frame.service';

describe('ColorFrameService', () => {
  let service: ColorFrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorFrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
