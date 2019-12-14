import { TestBed } from '@angular/core/testing';

import { ConcluirMissaoUseCase } from './ConcluirMissaoUseCase';

describe('ConcluirMissaoUseCase', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConcluirMissaoUseCase = TestBed.get(ConcluirMissaoUseCase);
    expect(service).toBeTruthy();
  });
});
