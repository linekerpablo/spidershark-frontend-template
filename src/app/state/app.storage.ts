import { IAuthLocalStorage } from 'app/shared-models/response/auth.localstorage.model';
import { Injectable, OnInit, OnChanges } from '@angular/core';
import { DataSharingService } from 'app/shared-services/data-sharing.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthStorage {
    contaLogada: IAuthLocalStorage;

    constructor(private _dataSharingService: DataSharingService,
        private _router: Router) {
        this.contaLogada = JSON.parse(
            localStorage.getItem('contaLogada')
        ) as IAuthLocalStorage;

        if (this.contaLogada === null || this.contaLogada === undefined) {
            this._dataSharingService.authStorage.subscribe(value => {
                this.contaLogada = value;
            });
        }
    }
}
