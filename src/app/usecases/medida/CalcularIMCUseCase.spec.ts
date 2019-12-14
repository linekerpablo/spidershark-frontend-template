import { TestBed } from '@angular/core/testing';

import { CalcularIMCUseCase } from './CalcularIMCUseCase';

describe('CalcularIMCUseCase', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalcularIMCUseCase = TestBed.get(CalcularIMCUseCase);
    expect(service).toBeTruthy();
  });
});
