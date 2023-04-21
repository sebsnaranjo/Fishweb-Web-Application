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
  id: string;
  name: string;
  lastname: string;
  email: string;
  upa: string;
  iat: number;
  exp: number;
  rol: {
    _id: string;
    id_rol: number;
    name_rol: string;
  };
}
