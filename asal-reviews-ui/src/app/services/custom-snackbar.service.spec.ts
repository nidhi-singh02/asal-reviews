import { TestBed, inject } from '@angular/core/testing';

import { CustomSnackbarService } from './custom-snackbar.service';

describe('CustomSnackbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomSnackbarService]
    });
  });

  it('should be created', inject([CustomSnackbarService], (service: CustomSnackbarService) => {
    expect(service).toBeTruthy();
  }));
});
