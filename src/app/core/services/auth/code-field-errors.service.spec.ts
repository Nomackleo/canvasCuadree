import { TestBed } from '@angular/core/testing';

import { CodeFieldErrorsService } from './code-field-errors.service';

describe('CodeFieldErrorsService', () => {
  let service: CodeFieldErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeFieldErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
