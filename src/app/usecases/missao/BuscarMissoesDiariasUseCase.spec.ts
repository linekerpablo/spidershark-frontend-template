import { TestBed } from '@angular/core/testing';

import { BuscarMissoesDiariasUseCase } from './BuscarMissoesDiariasUseCase';

describe('BuscarMissoesDiariasUseCase', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscarMissoesDiariasUseCase = TestBed.get(BuscarMissoesDiariasUseCase);
    expect(service).toBeTruthy();
  });
});
