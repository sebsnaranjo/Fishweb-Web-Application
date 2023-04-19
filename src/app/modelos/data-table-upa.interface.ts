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
  id: string;
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
export class Datos {
  PH: number;
  Temperatura: number;
  Conductividad_Electrica: number;
  Nivel_Agua: number;
  Turbidez: number;
  Oxigeno_Disuelto: number;
  _id: string;
}
export class TableFrame {
  _id: string;
  NombreUpa: string;
  Type_Com: boolean;
  Dir_Esclavo: number;
  Funtion: string;
  Dire_Registro: number;
  Estacion_Meteorologica: EstacionMeteorologica;
  Datos: Datos;
  CRC: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
