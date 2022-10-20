/* export interface User {
    [id: number]: any,
    nombre: string,
    apellido: string,
    email: string,
    clave: string,
    rolId: number,
    fullName: string,
} */

export interface User {
    _id: string,
    name: string,
    lastname: string,
    password: string,
    roles: string,
}

export interface CreateUserDTO extends Omit<User, 'id'> {}