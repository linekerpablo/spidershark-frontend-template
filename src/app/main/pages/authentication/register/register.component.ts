import { MatDialog } from '@angular/material';
import { DialogRemoveComponent } from './../../../dialogs/dialog-remove/dialog-remove.component';
import { AuthService } from 'app/shared-services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUser } from 'app/shared-models/request/auth.user.request.model';
import { IUserRegister } from './../../../../shared-models/request/userregister.request.model';
import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    ElementRef,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ToastrService } from 'ngx-toastr';
import { ReCaptcha2Component } from 'ngx-captcha';
import { UserService } from 'app/shared-services/user/user.service';
import { RouteNavigateUtils } from 'app/utils/route-navigate-utils';

declare var hljs: any;

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    color = 'primary';
    mode = 'indeterminate';

    unmatchpassword = false;
    hide = true;
    acceptTerms = false;
    submit = false;
    selected = '0';

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

    form: FormGroup;
    userRequest: IUserRegister = {} as IUserRegister;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _toastrService: ToastrService,
        private _router: Router,
        private _authService: AuthService,
        private _dialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private _route: ActivatedRoute
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
        this.form = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: [
                '',
                [Validators.required, confirmPasswordValidator]
            ],
            //recaptcha: ['', Validators.required]
        });

        this._route.queryParams.subscribe(params => {
            this.form.patchValue({ email: params['email'] });
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.form
            .get('password')
            .valueChanges.pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.form.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    changeAcceptTerms() {
        this.acceptTerms = !this.acceptTerms;
    }

    post() {
        this.submit = true;

        this.userRequest.email = this.form.get('email').value;
        this.userRequest.senha = this.form.get('password').value;
        this.userRequest.genero = this.selected;

        this._userService.post(this.userRequest).subscribe(
            res => {
                this.submit = false;

                this._toastrService.success(
                    'Sucesso',
                    'Cadastro realizado com sucesso :D'
                );

                this.login();
            },
            err => (this.submit = false)
        );
    }

    login() {
        this.submit = true;

        const authUser = new AuthUser();

        authUser.Email = this.userRequest.email;
        authUser.Senha = this.userRequest.senha;

        this._authService.login(authUser).subscribe(
            res => {
                this._toastrService.success('Sucesso', 'Logado com sucesso :D');

                window.location.href = `'/apps/${RouteNavigateUtils.Missoes}?email='${this.userRequest.email}`;
            },
            err => (this.submit = false)
        );
    }

    openDialog(): void {
        const dialogRef = this._dialog.open(DialogRemoveComponent, {
            width: '500px',
            data: {
                remove: false,
                title: 'Termos de uso',
                question:
                    'O SpiderShark, solicita que para o uso da ferramenta localizada no endereço de site online        ' +
                    'www.tempodedieta.com.br será necessária a leitura com atenção dos TERMOS e CONDIÇÕES DE            ' +
                    'USO da ferramenta, para que os mesmos possam ser aceitos antes e durante o uso de nossos        ' +
                    'serviços.                                                                                       ' +
                    'Ao utilizar o SpiderShark, o usuário afirma ser maior de 18(dezoito) anos e concorda estar ciente ' +
                    'dos termos e condições de utilização, fornecendo assim seu aceite eletrônico destes Termos e    ' +
                    'Condições de Uso. Se o usuário não concordar com os termos e condições presentes nesse          ' +
                    'documento, ele não deve utilizar a ferramenta e os serviços oferecidos pelo SpiderShark. A        ' +
                    'concordância por parte do SpiderShark em fornecer o acesso a ferramenta e o uso de seus           ' +
                    'serviços, será mediante a expressa aceitação dos termos e condições de uso.                     ' +
                    'Todo conteúdo, dados e informações contidas na ferramenta do SpiderShark poderão ser              ' +
                    'atualizadas, alteradas, ou removidas, isso sem aviso prévio, de forma definitiva ou em caráter  ' +
                    'temporário, de acordo com suas necessidades administrativas, legais ou de mercado.              ' +
                    'Nós trabalhamos para que as informações sejam sempre mantidas em seu endereço eletrônico        ' +
                    'de maneira segura. Porém, o SpiderShark não assumirá a responsabilidade pela utilização,          ' +
                    'aplicação ou processamento indevido, que porventura, os usuários possam dar às informações      ' +
                    'aqui contidas para todos os fins, sem o consentimento explícito e autorização do SpiderShark.     ' +
                    'Fica aqui registrado que é expressamente proibido utilizar a ferramenta do SpiderShark para       ' +
                    'divulgação de conteúdo que possa gerar responsabilidade civil, criminal ou penal de acordo      ' +
                    'com a Lei. Tais ações são de responsabilidade do usuário que tentar gerar tais ações. Esses     ' +
                    'conteúdos considerados proibidos são, por exemplo, a propagação de qualquer material ilícito,   ' +
                    'ameaçador, calunioso, difamatório, obsceno, profano, escandaloso, pornográfico,                 ' +
                    'preconceituoso, ou quaisquer outros conteúdos ilícitos, estes quais podem ferir as leis que     ' +
                    'estão em vigor. Caso algum usuário seja identificado com tais ações, ele terá seu acesso        ' +
                    'removido da ferramenta assim que identificado.                                                  ' +
                    'LEIA ATENTAMENTE A CADA ITEM, SÓ UTILIZE A FERRAMENTA APÓS CONCORDAR COM                        ' +
                    'TODOS OS TERMOS E CONDIÇÕES CITADOS EM TODO ESSE DOCUMENTO.                                     ' +
                    'A - Para o funcionamento da ferramenta você precisa fornecer seu nome de usuário e senha        ' +
                    'do Instagram para que possamos obter as informações necessárias para realizar as interações     ' +
                    'com você em seu perfil. Tais dados são utilizados apenas para acessar a plataforma, eles não    ' +
                    'são utilizados para outras finalidades que não sejam as mencionadas na ferramenta e não são     ' +
                    'distribuídos para terceiros. A senha do Instagram disponibilizada pelo Usuário na Plataforma    ' +
                    'será criptografada com o objetivo de se evitar a utilização incorreta desta informação.         ' +
                    'Lembramos que é de responsabilidade do usuário manter seu e-mail e telefone de celular          ' +
                    'atualizados em seu cadastro no Instagram, isso para que você possa sempre estar seguro.         ' +
                    'B - Nós atraímos usuários reais para seu perfil, porém pode acontecer de que perfis falsos e    ' +
                    'inativos tentem interagir com você, assim como o recebimento de mensagens de spam de            ' +
                    'terceiros. Lembramos que você está sujeito a isso mesmo não utilizando nossa ferramenta,        ' +
                    'antes de qualquer interação ou dar informações a qualquer perfil novo, valide se ele aparenta   ' +
                    'ser confiável.                                                                                  ' +
                    'C - A quantidade esperada de visitas ao seu perfil, de seguidores, curtidas ou comentários      ' +
                    'recebidos de usuários reais nem sempre é garantido. Tudo vai depender também de como            ' +
                    'você faz as postagens em seu perfil e da qualidade do seu conteúdo, além do seu público alvo    ' +
                    'e quais as configurações você irá realizar.                                                     ' +
                    'D - A ferramenta foi projetada para não sofrer quedas ou instabilidade, porém não podemos       ' +
                    'garantir a operação dela de forma ininterrupta ou contínua do serviço. Assim como a             ' +
                    'apresentação de erros durante seu uso. Em caso de algum problema nós vamos trabalhar para       ' +
                    'que ele seja resolvido o mais rápido possível, desde que o mesmo não possua interferência       ' +
                    'externa.                                                                                        ' +
                    'E - O SpiderShark não possuí nenhum tipo de contrato ou fidelidade. Você pode cancelar a          ' +
                    'qualquer momento. Nossa cobrança será realizada de forma automática mensalmente. Após a         ' +
                    'mensalidade ser renovada, não haverá reembolsos, créditos ou devoluções.                        ' +
                    'F - A sua cobrança mensal será renovada automaticamente. Para que a cobrança seja               ' +
                    'finalizada será necessário que você faça o cancelamento através da ferramenta. Ao realizar o    ' +
                    'cancelamento, seu acesso ao SpiderShark será mantido, porém o acesso a todas as                   ' +
                    'funcionalidades fornecidas para aqueles que estão contratando o serviço vão ser encerradas      ' +
                    'enquanto você não reativar seu plano.                                                           ' +
                    'G - Nos reservamos no direito de realizar qualquer alteração, suspensão ou remoção dos          ' +
                    'nossos serviços, assim como os conteúdos contidos na ferramenta a qualquer momento sem          ' +
                    'aviso prévio e sem incorrer em qualquer responsabilidade.                                       ' +
                    'H - O SpiderShark não possui qualquer parceria oficial com o Instagram, dessa forma você deve     ' +
                    'seguir e cumprir com todas as regras e políticas do Instagram, é de sua responsabilidade fazê-  ' +
                    'lo.                                                                                             ' +
                    'I - É de responsabilidade do usuário cuidar do seu perfil do Instagram, no qual nós não nos     ' +
                    'responsabilizamos por suas ações e suas consequências que podem levar a sua conta a ser         ' +
                    'banida.                                                                                         ' +
                    'Em caso de dúvidas, favor entrar em contato conosco através do suporte em nosso site.           ',
                no: 'Não concordo',
                yes: 'Concordo'
            }
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            this.acceptTerms = result;
        });
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

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
