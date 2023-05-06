import { TestBed } from '@angular/core/testing';

import { ValidatorFieldsService } from './validator-fields.service';

describe('ValidatorFieldsService', () => {
  let service: ValidatorFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
