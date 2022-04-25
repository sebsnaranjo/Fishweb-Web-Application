export interface DataTableUpa {
    [id: number]: any,
    fecha: string,
    hora: string,
    ph: string,
    temperatura: string,
    nivelAgua: number,
    temperaturaAmbiente: string,
}

export interface CreateDataUpaDTO extends Omit<DataTableUpa, 'id'> {}