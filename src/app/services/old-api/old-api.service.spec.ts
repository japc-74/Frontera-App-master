import { TestBed } from '@angular/core/testing';

import { OldApiService } from './old-api.service';

describe('OldApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OldApiService = TestBed.get(OldApiService);
    expect(service).toBeTruthy();
  });
});
