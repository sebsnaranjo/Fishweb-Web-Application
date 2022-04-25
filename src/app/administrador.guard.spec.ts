import { TestBed } from '@angular/core/testing';

import { AdministradorGuard } from './administrador.guard';

describe('AdministradorGuard', () => {
  let guard: AdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
