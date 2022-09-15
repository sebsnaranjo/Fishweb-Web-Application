export interface ILogin {
    email: string;
    password: string;
}

export interface IAuth {
    token: string;
    rol: string;
}

export interface UserRolModel {
    role: string
}