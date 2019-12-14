import { Login, Logout, AuthStateModel } from './app.actions';
import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { IUserAuthResponse } from '../shared-models/response/auth.user.response.model';
import { IAuthLocalStorage } from 'app/shared-models/response/auth.localstorage.model';

@State<AuthStateModel>({
    name: 'auth'
})
export class AuthState {
    @Selector()
    static userName(state: AuthStateModel) {
        return state.userName;
    }

    @Selector()
    static token(state: AuthStateModel) {
        return state.token;
    }

    @Action(Login)
    login(
        { patchState }: StateContext<AuthStateModel>,
        { payload: authState }: Login
    ) {
        patchState(authState);
    }

    @Action(Logout)
    logout({ setState }: StateContext<AuthStateModel>) {
        setState(null);
    }
}
