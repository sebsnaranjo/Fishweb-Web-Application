import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FrameService } from 'src/app/servicios/frame.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartItem,
  ChartType,
} from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  pHSelected: boolean = false;
  temperaturaSelected: boolean;
  nivelAguaSelected: boolean;
  turbidezSelected: boolean;
  oxigenoDisueltoSelected: boolean;
  recirculacionAguaSelected: boolean;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  fechaInicioGraph: Date = new Date();
  fechaFinGraph: Date = new Date();
  selectedRange: any;

  variables: string[];

  pdfUrl: SafeResourceUrl;

  panelOpenState = false;
  selected: string = 'Ninguna';

  private newLabel? = 'New label';

  dataGrafica: any = [];

  datos = [];

/*   public Huys: any = [];
  public phsData: number[] = [];
  public datesCollection: string[] = []; */

  constructor(
    private http: HttpClient,
    private frameService: FrameService,
    private sanitizer: DomSanitizer
  ) {
    Chart.register(Annotation);
  }

  public Huys: any[] = [];
  public phsData: number[] = [];
  public datesCollection: string[] = [];

  ngOnInit(): void {
    this.panelOpenState = false;
    console.log(this.panelOpenState);
  }

  onDateRangeChange(event: any) {
    this.fechaInicio = event.value.start;
    this.fechaFin = event.value.end;
  }

  onDateRangeChangeGraph(event: any) {
    this.fechaInicioGraph = event.value.start;
    this.fechaFinGraph = event.value.end;
  }

  /* Metodo que se encarga de generar los reportes */

  generateReport() {
    const datos = {
      fechaInicio: this.fechaInicio.toISOString(),
      fechaFin: this.fechaFin.toISOString(),
      variables: [] as string[],
    };

    if (this.pHSelected) {
      datos.variables.push('PH');
    }
    if (this.temperaturaSelected) {
      datos.variables.push('Temperatura');
    }
    if (this.nivelAguaSelected) {
      datos.variables.push('Nivel_Agua');
    }
    if (this.turbidezSelected) {
      datos.variables.push('Turbidez');
    }
    if (this.oxigenoDisueltoSelected) {
      datos.variables.push('Oxigeno_Disuelto');
    }

    console.log('ESTE ES EL ARREGLO', datos);

    this.frameService.getReport(datos).subscribe((pdfData: any) => {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  generateGraph() {
    const datos = {
      fechaInicio: this.fechaInicio.toISOString(),
      fechaFin: this.fechaFin.toISOString(),
      variables: [] as string[],
    };
  
    if (this.selected !== 'Ninguna') {
      datos.variables.push(this.selected);
    }
  
    this.frameService.getGraph(datos).subscribe((data) => {
      console.log(data);
      this.dataGrafica = data;
      this.Huys = this.dataGrafica; // Llenar Huys cuando se reciben los datos
      this.phsData = this.Huys.map((item: any) => item.Datos[this.selected]);
      this.datesCollection = this.Huys.map((item:any) => new Date(item.createdAt).toLocaleString());
  
      if (this.chart && this.chart.datasets) {
        this.chart.datasets[0].data = this.phsData;
        this.chart.labels = this.datesCollection;
        this.chart?.update({
          lazy: false,
          duration: 1000
        });
      }
  
      this.lineChartData = {
        datasets: [
          {
            data: this.phsData,
            label: this.selected,
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          },
        ],
        labels: this.datesCollection,
      };
      
      this.lineChartOptions = {
        elements: {
          line: {
            tension: 0.5,
          },
        },
        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          y: {
            position: 'left',
          },
          y1: {
            position: 'right',
            grid: {
              color: 'rgba(0,0,0,0.3)',
            },
            ticks: {
              color: 'black',
            },
          },
        },
      };
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.phsData,
        label: 'Variable seleccionada',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.datesCollection,
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(0,0,0,0.3)',
        },
        ticks: {
          color: 'black',
        },
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
}
