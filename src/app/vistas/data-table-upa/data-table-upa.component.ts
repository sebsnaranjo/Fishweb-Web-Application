import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { DataTableUpa, TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FrameService } from 'src/app/servicios/frame.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UpasService } from 'src/app/servicios/upas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sensor_1 } from 'src/app/modelos/settingsensor.interface';

interface Range {
  name: string;
  mean: number;
  min: number;
  max: number;
}

@Component({
  selector: 'app-data-table-upa',
  templateUrl: './data-table-upa.component.html',
  styleUrls: ['./data-table-upa.component.css']
})
export class DataTableUpaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  ELEMENT_DATA: TableFrame[];
  displayedColumns: string[] = ['createdAt', 'ph', 'temperatura', 'conductividad_electrica', 'nivelAgua', 'turbidez', 'oxigeno_disuelto', 'S_1'];
  dataSource = new MatTableDataSource<TableFrame>();

  idUpa: string;
  nameUpa: string;

  private interval$ = new Subject<void>();

  settingSensor: Sensor_1;
  nameSensor: string;
  stateSensor: boolean = true;

  dataRange: Range[] = [];

  minPh: number;
  maxPh: number;
  minTemp: number;
  maxTemp: number;
  minCond: number;
  maxCond: number;
  minNivAgua: number;
  maxNivAgua: number;
  minTur: number;
  maxTur: number;
  minOx: number;
  maxOx: number;
  minS_1: number;
  maxS_1: number;

  idUpaService: string = this.authService.getIdUpa();

  constructor(
    private frameService: FrameService,
    private upasService: UpasService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'createdAt': return new Date(item.createdAt);
        default: return item[property];
      }
    };

    this.frameService.getRangeSensor(this.idUpaService).subscribe((data: Range[]) => {
      this.dataRange = data;
      if (this.dataRange && this.dataRange.length > 0) {
        console.log("RANGO", this.dataRange[0].min);
        this.minPh = this.dataRange[0].min;
        this.maxPh = this.dataRange[0].max;
        this.minTemp = this.dataRange[1].min;
        this.maxTemp = this.dataRange[1].max;
        this.minCond = this.dataRange[2].min;
        this.maxCond = this.dataRange[2].max;
        this.minNivAgua = this.dataRange[3].min;
        this.maxNivAgua = this.dataRange[3].max;
        this.minTur = this.dataRange[4].min;
        this.maxTur = this.dataRange[4].max;
        this.minOx = this.dataRange[5].min;
        this.maxOx = this.dataRange[5].max;
        this.minS_1 = this.dataRange[6].min;
        this.maxS_1 = this.dataRange[6].max;
      }
    });

    this.dataSource.sort = this.sort;
    this.dataSource.sort.sort({ id: 'createdAt', start: 'desc', disableClear: true });
    this.changeDetectorRef.detectChanges();

    this.frameService.getLastSetting(this.idUpa).subscribe(data => {
      this.settingSensor = data;
      this.nameSensor = this.settingSensor.n;
      if(this.settingSensor.e == 1){
        this.stateSensor = true;
        this.table.renderRows();
      } else if (this.settingSensor.e == 0){
        this.stateSensor = false;
        this.table.renderRows();
      }
      console.log(this.settingSensor)
    })
  }

  ngOnInit(): void {
    this.getFrames();
    // Consumir servicio de tramas cada 5 segundos
    interval(5000)
      .pipe(takeUntil(this.interval$))
      .subscribe(() => {
        this.getFrames();
      });

    this.idUpa = this.authService.getIdUpa();
    this.upasService.getUpaById(this.idUpa).subscribe((data: any) => {
      this.nameUpa = data.name;
    });
  }

  ngOnDestroy(): void {
    this.interval$.next();
    this.interval$.complete();
  }

  public getFrames() {
    this.frameService.getAllFrameByUpa().subscribe((data: TableFrame[]) => {
      console.log("GET FRAMES", data);
    });
    let resp = this.frameService.getAllFrameByUpa();
    resp.subscribe((report) => (this.dataSource.data = report as unknown as TableFrame[]));
  }

  alternarColumna() {
    this.stateSensor = !this.stateSensor;
    
  }
}
export interface Upa{
  fecha: string;
  hora: string;
  ph: number;
  temperatura: number;
  nivelAgua: number;
  temperaturaAmbiente: number
}

