import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RouteUtils } from 'app/utils/route-utils';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AcaoMedidas } from 'app/utils/action-utils';
import { ICalculoIMCResposta } from 'app/shared-models/response/calculoimc.response.model';

@Injectable({
  providedIn: 'root'
})
export class CalcularIMCUseCase {
  private _route = RouteUtils.Medidas;
  private _calcularIMC = AcaoMedidas.CalcularIMC;

  constructor(private _http: HttpClient) { }

  public execute(usuarioId: number) {
    return this._http
      .get(`${environment.url_api}${this._route}${this._calcularIMC}?usuarioId=${usuarioId}`)
      .pipe(
        map((res: ICalculoIMCResposta[]) => {
          return res;
        })
      );
  }
}
