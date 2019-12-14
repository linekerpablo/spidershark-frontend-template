import { TestBed } from '@angular/core/testing';

import { BuscarUsuarioPorIdUseCaseService } from './buscar-usuario-por-id-use-case.service';

describe('BuscarUsuarioPorIdUseCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscarUsuarioPorIdUseCaseService = TestBed.get(BuscarUsuarioPorIdUseCaseService);
    expect(service).toBeTruthy();
  });
});
