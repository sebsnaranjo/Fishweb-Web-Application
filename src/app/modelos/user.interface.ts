/* export interface User {
    [id: number]: any,
    nombre: string,
    apellido: string,
    email: string,
    clave: string,
    rolId: number,
    fullName: string,
} */

export interface UserI {
    _id: string,
    name: string,
    lastname: string,
    password: string,
    email:string,
    roles: string,
    upaId: string
}

  

export interface CreateUserDTO extends Omit<UserI, 'id'> {}