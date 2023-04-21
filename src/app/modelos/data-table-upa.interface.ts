export interface DataTableUpa {
    [id: number]: any,
    fecha: string,
    hora: string,
    ph: string,
    temperatura: string,
    nivelAgua: number,
    temperaturaAmbiente: string,
}

export interface UpaModel {
    _id: string,
    name: string
    location: string
}

export class TableFrame {
    _id: string;
    nombreUpa: string;
    type_com: boolean;
    dir_esclavo: number;
    funtion: string;
    dire_registro: number;
    estacion_meteorologica: [
        temperatura: null,
        humedad: null,
        velocidad_viento: number,
        dir_viento: number,
        lluvia: number,
        _id: string
    ];
    datos: [
        ph: number,
        temperatura: number,
        conductividad_electrica: number,
        nivel_agua: 10,
        turbidez: 4,
        oxigeno_disuelto: number,
        _id: string
    ];
    crc: 5;
    createdAt: Date;
    updatedAt: Date
}

export interface CreateDataUpaDTO extends Omit<DataTableUpa, 'id'> {}