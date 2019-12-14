import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthUser } from 'app/shared-models/request/auth.user.request.model';
import { IUserAuthResponse } from 'app/shared-models/response/auth.user.response.model';
import { AuthService } from 'app/shared-services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector     : 'forgot-password',
    templateUrl  : './forgot-password.component.html',
    styleUrls    : ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    color = 'primary';
    mode = 'indeterminate';

    forgotPasswordForm: FormGroup;
    authUser: AuthUser;
    send: Boolean = false;
    submit = false;

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
        private _toastr: ToastrService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    forgotPassword() {
        this.submit = true;

        this.authUser = new AuthUser();

        this.authUser.Email = this.forgotPasswordForm.get('email').value;

        this._authService.forgotPassword(this.authUser).subscribe((response: IUserAuthResponse) => {
            this._toastr.success('Sucesso', 'Nova senha enviada no e-mail :D');

            this.forgotPasswordForm.reset();
            this.send = true;
            this.submit = false;
        },
        err => this.submit = false);
    }
}
