import { TestBed } from '@angular/core/testing';

import { NiveisUsuariosUseCase } from './NiveisUsuariosUseCase';

describe('NiveisUsuariosUseCase', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiveisUsuariosUseCase = TestBed.get(NiveisUsuariosUseCase);
    expect(service).toBeTruthy();
  });
});
