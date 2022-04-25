export interface TokenI {
    data: {
        token: string,
        exp: string,
        user: {
            id: number,
            nombre: string,
            apellido: string,
            rolId: string,
            fullName: string,
            nombreRol: string,
        }
    }
}

export interface TokenDecodeI {
    exp: string,
}