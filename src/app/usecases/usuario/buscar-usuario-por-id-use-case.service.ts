import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RouteUtils } from 'app/utils/route-utils';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioPorIdUseCaseService {
  private _route = RouteUtils.Usuarios;

  constructor(private _http: HttpClient) { }

  public execute(usuarioId: number) {
    return this._http.get(`${environment.url_api}${this._route}${usuarioId}`).pipe(tap(res => {
      return res;
     }));
  }
}
