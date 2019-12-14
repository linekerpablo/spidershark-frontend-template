import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RouteUtils } from 'app/utils/route-utils';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IMissaoDiariaResposta } from 'app/shared-models/response/missoes.diarias.response.model';
import { AcaoMissoes } from 'app/utils/action-utils';

@Injectable({
  providedIn: 'root'
})
export class BuscarMissoesDiariasUseCase {
  private _route = RouteUtils.Missoes;
  private _buscarMissoesDiarias = AcaoMissoes.BuscarMissoesDiarias;

  constructor(private _http: HttpClient) { }

  public execute(usuarioId: number) {
    return this._http.get(`${environment.url_api}${this._route}${this._buscarMissoesDiarias}${usuarioId}`)
    .pipe(
      map((res: IMissaoDiariaResposta[]) => {
        return res;
      })
    );
  }
}
