export interface TokenI {
  data: {
    token: string;
    exp: string;
    user: {
      id: number;
      nombre: string;
      apellido: string;
      rolId: string;
      fullName: string;
      nombreRol: string;
    };
  };
}

export interface TokenDecodeI {
  name: string;
  lastname: string;
  email: string;
  iat: number;
  exp: number;
  upa: string;
  rol: {
    _id: string;
    id_rol: number;
    name_rol: string;
  };
}
