import { AuthUser } from './../../../../shared-models/request/auth.user.request.model';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/shared-services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { ReCaptcha2Component } from 'ngx-captcha';
import { RouteNavigateUtils } from 'app/utils/route-navigate-utils';

declare var hljs: any;

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    color = 'primary';
    mode = 'indeterminate';

    loginForm: FormGroup;
    authUser: AuthUser;
    hide = true;
    submit = false;

    public siteKey = '6Ldy2sAUAAAAAH1tEkyQkjPe6IYNgkLWCT2VX58c';
    public theme: 'light' | 'dark' = 'light';
    public size: 'compact' | 'normal' = 'normal';
    public lang = 'pt-br';
    public type: 'image' | 'audio';
    public useGlobalDomain: false;

    @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
    @ViewChild('langInput') langInput: ElementRef;

    public captchaIsLoaded = false;
    public captchaSuccess = false;
    public captchaIsExpired = false;
    public captchaResponse?: string;

    private isLogged: boolean;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _toastrService: ToastrService,
        private _store: Store,
        private cdr: ChangeDetectorRef
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            //recaptcha: ['', Validators.required]
        });

        this.VerifyUserLogged();
    }

    private VerifyUserLogged() {
        this._store.subscribe(res => {
            if (res.auth && res.auth.token) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
            }

            if (this.isLogged) {
                window.location.href = `'/apps/${RouteNavigateUtils.Missoes}?email='${this.loginForm.get('email').value}`;
            }
        });
    }

    login() {
        this.submit = true;
        this.authUser = new AuthUser();

        this.authUser.Email = this.loginForm.get('email').value;
        this.authUser.Senha = this.loginForm.get('password').value;

        this._authService.login(this.authUser).subscribe(
            res => {
                this.submit = true;
                this._toastrService.success('Sucesso', 'Logado com sucesso :D');

                window.location.href = `'/apps/${RouteNavigateUtils.Missoes}?email='${this.loginForm.get('email').value}`;
            },
            err => (this.submit = false)
        );
    }

    ngAfterViewInit(): void {
        this.highlight();
    }

    handleReset(): void {
        this.captchaSuccess = false;
        this.captchaResponse = undefined;
        this.captchaIsExpired = false;
        this.cdr.detectChanges();
    }

    handleSuccess(captchaResponse: string): void {
        this.captchaSuccess = true;
        this.captchaResponse = captchaResponse;
        this.captchaIsExpired = false;
        this.cdr.detectChanges();
    }

    handleLoad(): void {
        this.captchaIsLoaded = true;
        this.captchaIsExpired = false;
        this.cdr.detectChanges();
    }

    handleExpire(): void {
        this.captchaSuccess = false;
        this.captchaIsExpired = true;
        this.cdr.detectChanges();
    }

    reload(): void {
        this.captchaElem.reloadCaptcha();
    }

    getCaptchaId(): void {
        alert(this.captchaElem.getCaptchaId());
    }

    reset(): void {
        this.captchaElem.resetCaptcha();
    }

    private highlight(): void {
        const highlightBlocks = document.getElementsByTagName('code');
        for (let i = 0; i < highlightBlocks.length; i++) {
            const block = highlightBlocks[i];
            hljs.highlightBlock(block);
        }
    }
}
