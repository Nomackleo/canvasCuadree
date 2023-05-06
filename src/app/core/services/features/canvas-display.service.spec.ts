import { TestBed } from '@angular/core/testing';

import { CanvasDisplayService } from './canvas-display.service';

describe('CanvasDisplayService', () => {
  let service: CanvasDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
