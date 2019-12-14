import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../shared-services/auth.service';
import { AuthState } from '../state/app.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.authService.logout();

        return false;
    }
}
