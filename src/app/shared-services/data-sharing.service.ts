import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAuthLocalStorage } from 'app/shared-models/response/auth.localstorage.model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public passouDeNivel: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public concluiuMissao: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public picture: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public account: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public authStorage: BehaviorSubject<IAuthLocalStorage> = new BehaviorSubject<IAuthLocalStorage>(null);

  constructor() { }
}
