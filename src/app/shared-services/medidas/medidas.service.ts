import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RouteUtils } from 'app/utils/route-utils';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { AcaoMedidas } from 'app/utils/action-utils';
import { ICriarMedida } from 'app/shared-models/request/criar.medida.request.model';
import { IMedidasResponse } from 'app/shared-models/response/medidas.response.model';
import { IAlterarMedida } from 'app/shared-models/request/alterar.medida.request.model';

@Injectable({
    providedIn: 'root'
})
export class MedidasService {
    private _route = RouteUtils.Medidas;
    private _buscarPorUsuarioId = AcaoMedidas.BuscarPorUsuarioId;

    constructor(private http: HttpClient) {}

    public post(request: ICriarMedida) {
        return this.http.post(`${environment.url_api}${this._route}`, request).pipe(tap(res => {}));
    }

    public put(request: IAlterarMedida) {
        return this.http.put(`${environment.url_api}${this._route}`, request).pipe(tap(res => {}));
    }

    public buscarPorUsuarioId(usuarioId: number) {
        return this.http
            .get(`${environment.url_api}${this._route}${this._buscarPorUsuarioId}?usuarioId=${usuarioId}`)
            .pipe(
                map((res: IMedidasResponse[]) => {
                    return res;
                })
            );
    }

    public delete(lembreteId: number) {
        return this.http.delete(`${environment.url_api}${this._route}${lembreteId}`).pipe(tap(res => {}));
    }
}
