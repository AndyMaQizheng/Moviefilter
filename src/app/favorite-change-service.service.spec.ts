import { TestBed } from '@angular/core/testing';

import { FavoriteChangeServiceService } from './favorite-change-service.service';

describe('FavoriteChangeServiceService', () => {
  let service: FavoriteChangeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteChangeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
