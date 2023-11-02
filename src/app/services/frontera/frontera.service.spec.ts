import { TestBed } from '@angular/core/testing';

import { FronteraService } from './frontera.service';

describe('FronteraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FronteraService = TestBed.get(FronteraService);
    expect(service).toBeTruthy();
  });
});
