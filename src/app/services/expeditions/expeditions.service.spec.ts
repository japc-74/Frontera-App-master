import { TestBed } from '@angular/core/testing';

import { ExpeditionsService } from './expeditions.service';

describe('ExpeditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpeditionsService = TestBed.get(ExpeditionsService);
    expect(service).toBeTruthy();
  });
});
