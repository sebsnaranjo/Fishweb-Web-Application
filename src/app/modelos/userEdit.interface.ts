export class UserEditI{
    _id: number;
    name: string;
    lastname: string;
    email: string;
    roles: {
        id_rol: number;
        name_rol: string;
    }
}