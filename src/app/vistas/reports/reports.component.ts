import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FrameService } from 'src/app/servicios/frame.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Chart, ChartItem } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  pHSelected: boolean = false;
  temperaturaSelected: boolean;
  nivelAguaSelected: boolean;
  temperaturaAmbienteSelected: boolean;
  tiempoAlimentacionSelected: boolean;
  recirculacionAguaSelected: boolean;
  fechaInicio: Date = new Date();;
  fechaFin: Date = new Date();;
  selectedRange: any;


  variables: string[];

  pdfUrl: SafeResourceUrl;


  panelOpenState = false;
  selected = 'option2';

  chart: any;

  datos = [
    {
      "_id": "63f5840290297b6f5e87c413",
      "Datos": {
        "Temperatura": 90
      },
      "createdAt": "2023-02-22T02:54:58.152Z"
    },
    {
      "_id": "63f6db967f6f6fab6ef0d58a",
      "Datos": {
        "Temperatura": 90
      },
      "createdAt": "2023-02-23T03:20:54.465Z"
    },
    {
      "_id": "63f82d7f895bfdb075db69f9",
      "Datos": {
        "Temperatura": 90
      },
      "createdAt": "2023-02-24T03:22:39.530Z"
    },
    {
      "_id": "63f83dad6077ad8f32931a3a",
      "Datos": {
        "Temperatura": 90
      },
      "createdAt": "2023-02-24T04:31:41.052Z"
    }
  ];
  constructor(
    private http: HttpClient,
    private frameService: FrameService, 
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.panelOpenState = false;
    console.log(this.panelOpenState)
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

  generateReport() {

    const datos = {
      fechaInicio: '2023-02-23T05:00:00.000Z',
      fechaFin: '2023-02-24T05:00:00.000Z',
      variables: ['PH']
    };

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

  createChart() {
    const canvas = document.getElementById('temperatura-chart') as HTMLCanvasElement;
    const ctx = (canvas.getContext('2d') as CanvasRenderingContext2D) ?? {} as ChartItem;

    const labels = this.datos.map(dato => dato.createdAt);
    const data = this.datos.map(dato => dato.Datos.Temperatura);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperatura',
            data: data,
            borderColor: 'blue',
            fill: false
          }
        ]
      }
    });
  }

}
