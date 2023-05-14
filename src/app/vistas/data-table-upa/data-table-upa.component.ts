import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy  } from '@angular/core';
import { DataTableUpa, TableFrame } from 'src/app/modelos/data-table-upa.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FrameService } from 'src/app/servicios/frame.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UpasService } from 'src/app/servicios/upas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-data-table-upa',
  templateUrl: './data-table-upa.component.html',
  styleUrls: ['./data-table-upa.component.css']
})
export class DataTableUpaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ELEMENT_DATA: TableFrame[];
  displayedColumns: string[] = ['createdAt', 'ph', 'temperatura', 'conductividad_electrica', 'nivelAgua', 'turbidez'];
  dataSource = new MatTableDataSource<TableFrame>();

  idUpa: string;
  nameUpa: string;

  private interval$ = new Subject<void>();

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
    this.dataSource.sort = this.sort;
    this.dataSource.sort.sort({ id: 'createdAt', start: 'desc', disableClear: true });
    this.changeDetectorRef.detectChanges();
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
}
export interface Upa{
  fecha: string;
  hora: string;
  ph: number;
  temperatura: number;
  nivelAgua: number;
  temperaturaAmbiente: number
}

