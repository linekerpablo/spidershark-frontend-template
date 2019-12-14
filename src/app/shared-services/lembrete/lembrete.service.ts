import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RouteUtils } from 'app/utils/route-utils';
import { environment } from 'environments/environment';
import { ICriarLembrete } from 'app/shared-models/request/criar.lembrete.request.model';
import { ILembreteResponse } from 'app/shared-models/response/lembrete.response.model';
import { map } from 'rxjs/operators';
import { AcaoLembrete } from 'app/utils/action-utils';

@Injectable({
    providedIn: 'root'
})
export class LembreteService {
    private _route = RouteUtils.Lembretes;
    private _buscarPorUsuarioId = AcaoLembrete.BuscarPorUsuarioId;

    constructor(private http: HttpClient) {}

    public post(request: ICriarLembrete) {
        return this.http.post(`${environment.url_api}${this._route}`, request).pipe(tap(res => {}));
    }

    public buscarPorUsuarioId(usuarioId: number) {
        return this.http
            .get(`${environment.url_api}${this._route}${this._buscarPorUsuarioId}?usuarioId=${usuarioId}`)
            .pipe(
                map((res: ILembreteResponse[]) => {
                    return res;
                })
            );
    }

    public put(request: ICriarLembrete) {
        return this.http.put(`${environment.url_api}${this._route}`, request).pipe(tap(res => {}));
    }

    public delete(lembreteId: number) {
        return this.http.delete(`${environment.url_api}${this._route}${lembreteId}`).pipe(tap(res => {}));
    }
}
