import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FrameService } from 'src/app/servicios/frame.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Chart, ChartConfiguration, ChartEvent, ChartItem, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  pHSelected: boolean = false;
  temperaturaSelected: boolean;
  nivelAguaSelected: boolean;
  turbidezSelected: boolean;
  oxigenoDisueltoSelected: boolean;
  recirculacionAguaSelected: boolean;
  fechaInicio: Date = new Date();;
  fechaFin: Date = new Date();;
  selectedRange: any;


  variables: string[];

  pdfUrl: SafeResourceUrl;


  panelOpenState = false;
  selected = 'option2';
  
  private newLabel? = 'New label';

  datos = [
    {
      "_id": "63f5840290297b6f5e87c413",
      "Datos": {
        "Temperatura": 1
      },
      "createdAt": "2023-02-22T02:54:58.152Z"
    },
    {
      "_id": "63f6db967f6f6fab6ef0d58a",
      "Datos": {
        "Temperatura": 9
      },
      "createdAt": "2023-02-23T03:20:54.465Z"
    },
    {
      "_id": "63f82d7f895bfdb075db69f9",
      "Datos": {
        "Temperatura": 3
      },
      "createdAt": "2023-02-24T03:22:39.530Z"
    },
    {
      "_id": "63f83dad6077ad8f32931a3a",
      "Datos": {
        "Temperatura": 6
      },
      "createdAt": "2023-02-24T04:31:41.052Z"
    }
  ];
  constructor(
    private http: HttpClient,
    private frameService: FrameService, 
    private sanitizer: DomSanitizer
  ) {
    Chart.register(Annotation)
  }

  public Huys: any = this.datos;
  public phsData: number[] =  this.Huys.map((item: any) => item.Datos.Temperatura);
  public datesCollection: string[] =this.Huys.map((item:any) => new Date(item.createdAt).toLocaleString());

  ngOnInit(): void {
    this.panelOpenState = false;
    console.log(this.panelOpenState)
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        
        data: this.phsData,
        label: 'PH',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: this.datesCollection
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
        },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    // events
    public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
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

  descargarReporte() {

/*     this.variables = [
      "PH"
    ]

    this.frameService.getReport(this.fechaInicio, this.fechaFin, this.variables).subscribe(
      (pdfData: Blob) => {
        const pdfUrl = URL.createObjectURL(pdfData);
        this.pdfUrl = pdfUrl;
        console.log("URL", pdfUrl)
      },
      (error) => {
        console.log("HAY UN ERROR", error);
      }
    ) */
  }

  /* Metodo que se encarga de generar los reportes */

  generateReport() {

/*     const datos = {
      "fechaInicio": "2023-01-23T03:20:54.465Z",
      "fechaFin": "2023-03-23T03:20:54.465Z",
      "variables": ["PH"]
    } */

    const datos = {
      "fechaInicio": this.fechaInicio.toISOString(),
      "fechaFin": this.fechaFin.toISOString(),
      "variables": [] as string[]
    };
  
    if (this.pHSelected) {
      datos.variables.push("PH");
    }
    if (this.temperaturaSelected) {
      datos.variables.push("Temperatura");
    }
    if (this.nivelAguaSelected) {
      datos.variables.push("Nivel_Agua");
    }
    if (this.turbidezSelected) {
      datos.variables.push("Turbidez");
    }
    if (this.oxigenoDisueltoSelected) {
      datos.variables.push("Oxigeno_Disuelto");
    }

    console.log("ESTE ES EL ARREGLO", datos)

    this.frameService.getReport(datos).subscribe((pdfData: any) => {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

  }

  onDateRangeChange(event: any) {
    this.fechaInicio = event.value.start;
    this.fechaFin = event.value.end;

    console.log(this.fechaFin);
  }

  

}
