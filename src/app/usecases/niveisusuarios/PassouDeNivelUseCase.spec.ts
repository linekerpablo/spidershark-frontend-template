import { TestBed } from '@angular/core/testing';

import { PassouDeNivelUseCase } from './PassouDeNivelUseCase';

describe('PassouDeNivelUseCase', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassouDeNivelUseCase = TestBed.get(PassouDeNivelUseCase);
    expect(service).toBeTruthy();
  });
});
