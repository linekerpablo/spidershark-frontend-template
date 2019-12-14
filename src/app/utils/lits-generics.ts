import { Injectable } from '@angular/core';
import { DomainModel } from '../shared-models/common.request.model';

@Injectable({
  providedIn: 'root'
})
export class GetLists {
  styleList: DomainModel[] = [];

  constructor() {}

  getStyles(): DomainModel[] {
    return this.styleList = [
      {
        Id: '1',
        Name: 'Maori'
      },
      {
        Id: '2',
        Name: 'Tribal'
      },
      {
        Id: '3',
        Name: 'Aquarela'
      },
      {
        Id: '4',
        Name: 'New school'
      },
      {
        Id: '5',
        Name: 'Old school'
      },
      {
        Id: '6',
        Name: 'Geométrico'
      },
      {
        Id: '7',
        Name: 'Tons de cinza'
      },
      {
        Id: '8',
        Name: 'Pontilhismo'
      },
      {
        Id: '9',
        Name: 'Foto realismo'
      },
      {
        Id: '10',
        Name: 'Biomecânico'
      },
      {
        Id: '11',
        Name: 'Oriental'
      },
      {
        Id: '12',
        Name: 'Outros'
      }
    ];
  }
}
