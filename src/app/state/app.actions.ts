export class AuthStateModel {
    token: string;
    userName: string;
  }
  
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: AuthStateModel) {}
  }
  
  export class Logout {
    static readonly type = '[Auth] Logout';
  }
  