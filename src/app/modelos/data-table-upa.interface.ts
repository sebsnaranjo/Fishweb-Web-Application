export interface DataTableUpa {
  [id: number]: any;
  fecha: string;
  hora: string;
  ph: string;
  temperatura: string;
  nivelAgua: number;
  temperaturaAmbiente: string;
}
export interface UpaModel {
  _id: string;
  name: string;
  location: string;
}
export class EstacionMeteorologica {
  temperatura: number;
  humedad: number;
  velocidad_viento: number;
  dir_viento: number;
  lluvia: number;
  _id: string;
}
export class Sensores {
  PH: number;
  Temp: number;
  C_Electrica: number;
  N_Agua: number;
  Tu: number;
  O_Dis: number;
  _id: string;
}

export class Actuadores {
  Alarmas: number;
  Recir: number;
  Alim: number;
  Ox: number;
  _id: string;
}

export class TableFrame {
  idUPA: string;
  T_Com: number;
  D_Esc: number;
  Fn: string;
  D_Reg: number;
  Sensores: Sensores;
  Act: Actuadores;
  _id?: string;
  createdAt: Date;
  updatedAt: string;
  __v: number;
  CRC: string;
}
export class Location {
  name: string;
  _id: string;
}
export class Upa {
  _id: string;
  name: string;
  location: Location;
  __v: number;
}

export interface CreateDataUpaDTO extends Omit<DataTableUpa, 'id'> {}
