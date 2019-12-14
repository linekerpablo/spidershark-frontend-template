import { TestBed } from '@angular/core/testing';

import { AlterarUsuarioUseCase } from './AlterarUsuarioUseCase';

describe('AlterarUsuarioUseCase', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlterarUsuarioUseCase = TestBed.get(AlterarUsuarioUseCase);
    expect(service).toBeTruthy();
  });
});
