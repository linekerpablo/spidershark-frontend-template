import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { AuthService } from 'app/shared-services/auth.service';
import { AuthStorage } from 'app/state/app.storage';
import { NiveisUsuariosUseCase } from 'app/usecases/niveisusuarios/NiveisUsuariosUseCase';
import { INiveisUsuariosResposta } from 'app/shared-models/response/niveisusuarios.resposta.model';
import { DialogRemoveComponent } from 'app/main/dialogs/dialog-remove/dialog-remove.component';
import { DataSharingService } from 'app/shared-services/data-sharing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    niveisUsuariosResposta: INiveisUsuariosResposta;

    account: string;
    email: string;
    picture: string;
    value: number;
    tooltipNivel: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private _authService: AuthService,
        private _authStorage: AuthStorage,
        private _router: Router,
        private _dialog: MatDialog,
        private _niveisUsuariosUseCase: NiveisUsuariosUseCase,
        private _dataSharingService: DataSharingService
    ) {
        if (
            _authStorage.contaLogada !== undefined &&
            _authStorage.contaLogada !== null
        ) {
            this.account = _authStorage.contaLogada.nome;

            if (this.picture === undefined || this.picture === null) {
                if (_authStorage.contaLogada.fotoDePerfil) {
                    this.picture = _authStorage.contaLogada.fotoDePerfil;
                }
                else {
                    this.picture = './../../../../../../assets/images/avatars/usuario-png-icon.png';
                }
            }

            this.email = _authStorage.contaLogada.email;
        }

        this._dataSharingService.passouDeNivel.subscribe(value => {
            if (value === true) {
                this.nivelUsuarioResposta();
            }
        });

        this._dataSharingService.concluiuMissao.subscribe(value => {
            if (value === true) {
                this.nivelUsuarioResposta();
            }
        });

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(settings => {
                this.horizontalNavbar =
                    settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {
            id: this._translateService.currentLang
        });

        this.nivelUsuarioResposta();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logout() {
        this._authService.logout();
    }

    myAccount() {
        this._router.navigate(['/apps/meu-perfil']);
    }

    async nivelUsuarioResposta() {
        await this._niveisUsuariosUseCase.execute(this._authStorage.contaLogada.usuarioId)
            .subscribe((res: INiveisUsuariosResposta) => {
                this.niveisUsuariosResposta = res;

                this.value = this.niveisUsuariosResposta.percentualDeQuantoFalta;

                const proximoNivel = this.niveisUsuariosResposta.experienciaProximoNivel - this.niveisUsuariosResposta.experienciaNivelAtual;
                this.tooltipNivel = `Falta ${proximoNivel}xp para o nível ${this.niveisUsuariosResposta.descricaoProximoNivel}`;
            });
    }

    abrirModalProximoNivel(): void {
        const dialogRef = this._dialog.open(DialogRemoveComponent, {
            width: '250px',
            data: {
                remove: false,
                title: 'Próximo nível',
                question: this.tooltipNivel,
                no: undefined,
                yes: 'Bora lá',
                image: this.niveisUsuariosResposta.imagemProximoNivel
            }
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
        });
    }
}
