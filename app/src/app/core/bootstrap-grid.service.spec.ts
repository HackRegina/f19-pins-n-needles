import { TestBed } from '@angular/core/testing';

import { BootstrapGridService } from './bootstrap-grid.service';

describe('BootstrapGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BootstrapGridService = TestBed.get(BootstrapGridService);
    expect(service).toBeTruthy();
  });
});
