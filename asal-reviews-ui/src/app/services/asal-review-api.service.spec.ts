import { TestBed, inject } from '@angular/core/testing';

import { AsalReviewAPIService } from './asal-review-api.service';

describe('AsalReviewAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsalReviewAPIService]
    });
  });

  it('should be created', inject([AsalReviewAPIService], (service: AsalReviewAPIService) => {
    expect(service).toBeTruthy();
  }));
});
