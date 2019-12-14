import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RouteUtils } from 'app/utils/route-utils';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IMissaoDiariaResposta } from 'app/shared-models/response/missoes.diarias.response.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConcluirMissaoUseCase {
  private _route = RouteUtils.MissoesConcluidasUsuario;

  constructor(private _http: HttpClient,
    private _toastrService: ToastrService) { }

  public execute(missaoId: number, usuarioId: number) {
    const MissoesConcluidasUsuario = {
      missaoId: missaoId,
      usuarioId: usuarioId
    };

    return this._http.post(`${environment.url_api}${this._route}`, MissoesConcluidasUsuario)
      .pipe(
        map((res: IMissaoDiariaResposta[]) => {
          return res;
        })
      );
  }
}
