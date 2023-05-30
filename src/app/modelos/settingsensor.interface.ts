export class Sensor_1 {
  idUPA: string;
  n: string;
  e: number;
  _id: string;
  __v: number;

  constructor(
    idUPA: string = '',
    n: string = '',
    e: number = 0,
    _id: string = '',
    __v: number = 0
  ) {
    this.idUPA = idUPA;
    this.n = n;
    this.e = e;
    this._id = _id;
    this.__v = __v;
  }
}

export class Propiedades {
  constructor(public n: number, public m: number) {}
}

export class DataUPAs {
  constructor(
    public idUPA: string,
    public PH: Propiedades,
    public Temp: Propiedades,
    public C_Electrica: Propiedades,
    public N_Agua: Propiedades,
    public Tu: Propiedades,
    public O_Dis: Propiedades,
    public S_1: Propiedades
  ) {}
}

export class Range {
    name: string;
    mean: number;
    min: number;
    max: number;
  }