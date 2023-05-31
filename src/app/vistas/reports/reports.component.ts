import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FrameService } from 'src/app/servicios/frame.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Chart, ChartConfiguration, ChartEvent, ChartItem, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { AuthService } from 'src/app/servicios/auth.service';
import { UpasService } from 'src/app/servicios/upas.service';
import Swal from 'sweetalert2';
import { MatDateRangePicker, MatDatepickerInputEvent, DateRange } from '@angular/material/datepicker';
import { Sensor_1 } from 'src/app/modelos/settingsensor.interface';

PdfMakeWrapper.setFonts(pdfFonts);

interface DataResponse {
  fecha: string;
  PH: string;
  Temperatura: string;
  Turbidez: string;
  Nivel_Agua: string;
  Oxigeno_Disuelto: string;
}

type TableRow = (string)[];

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
  S_1Selected: boolean;
  fechaInicio: any;
  fechaFin: any;
  fechaInicioGraph: Date = new Date();
  fechaFinGraph: Date = new Date();
  selectedRange: any;

  variable: string[]=[];

  variables: string[];

  pdfUrl: SafeResourceUrl;

  panelOpenState = false;
  selected: string = 'Ninguna';

  private newLabel? = 'New label';

  dataGrafica: any = [];

  datos = [];

  idUpa: string;
  nombreUpa: string;

  rolUser: any;

  upas: any[] = [];
  selectedUpaId: string;
  nombreUpaUser: string;

  fechaInicioValidation: any;
  fechaFinValidation: any;

  settingSensor: Sensor_1;
  nameSensor: string;
  stateSensor: boolean;

  constructor(
    private http: HttpClient,
    private frameService: FrameService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private upasService: UpasService
  ) { Chart.register(Annotation); }

  public Huys: any[] = [];
  public phsData: number[] = [];
  public datesCollection: string[] = [];

  ngOnInit(): void {
    this.panelOpenState = false;
    console.log(this.panelOpenState);

    this.idUpa = this.authService.getIdUpa();

    this.frameService.getLastSetting(this.idUpa).subscribe(data => {
      this.settingSensor = data;
      this.nameSensor = this.settingSensor.n;
      if(this.settingSensor.e == 1){
        this.stateSensor = true;
      } else if (this.settingSensor.e == 0){
        this.stateSensor = false;
      }
      console.log(this.settingSensor)
    })

    this.upasService.getUpaById(this.idUpa).subscribe((data:any) => {
      this.nombreUpa = data.name;
    })

    this.rolUser = this.authService.getIdRol();
    console.log("ROL", this.rolUser)

    this.getUPAs();
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(`Fecha de inicio seleccionada: ${event.value}`);
    this.fechaInicio = event.value;
    this.fechaInicioValidation = event.value;
  }
  
  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(`Fecha de fin seleccionada: ${event.value}`);
    this.fechaFin = event.value;
    this.fechaFinValidation = event.value;
  }

  onDateRangeChangeGraph(event: any) {
    this.fechaInicioGraph = event.value.start;
    this.fechaFinGraph = event.value.end;
  }
  

  /* Metodo que se encarga de generar los reportes (Ya no se usa) */

/*   generateReport() {
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
  } */

  /**
  * Metodo que se encargar de generar la grafica
  */
  getUPAs() {
    this.upasService.getUPAs().subscribe(data => {
      console.log("UPAS", data)
      this.upas = data;
    })
  }

  generateGraph() {
    if(this.validateSelection()){
      if(this.rolUser == '1'){
        this.nombreUpaUser = this.selectedUpaId;
        this.upasService.getUpaById(this.selectedUpaId).subscribe((data:any) => {
          this.nombreUpa = data.name;
        })
      } else {
        this.nombreUpaUser = this.idUpa;
      }

      if (!this.fechaInicio || !this.fechaFin) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes seleccionar un rango de fecha',
        });
        return;
      }
  
      const datos = {
        fechaInicio: this.fechaInicio.toISOString(),
        fechaFin: this.fechaFin.toISOString(),
        variables: [] as string[],
        idUpa: this.nombreUpaUser
      };
    
      if (this.selected !== 'Ninguna') {
        datos.variables.push(this.selected);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Debes seleccionar una opción',
        });
        return;
      }

      this.frameService.getGraph(datos).subscribe((data) => {
        console.log(data);
        this.dataGrafica = data;
        this.Huys = this.dataGrafica; // Llenar Huys cuando se reciben los datos
        this.phsData = this.Huys.map((item: any) => item.Sensores[this.selected]);
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
          plugins: {
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false,
              backgroundColor: '#fff',
              borderColor: 'rgba(0,0,0,0.3)',
              borderWidth: 1,
              titleColor: '#000',
              bodyColor: '#000',
              callbacks: {
                title: (tooltipItems) => {
                  // Personalizar el título del tooltip aquí
                  return `Fecha: ${tooltipItems[0].label}`;
                },
                label: (tooltipItem) => {
                  // Personalizar la etiqueta del tooltip aquí
                  return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
                }
              }
            }
          }          
        };
      });
    }
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

  /**
  * Metodo que se encargar de generar el PDF
  */

  async generate() {
    if(this.validateSelection()){
      if(this.rolUser == '1'){
        this.nombreUpaUser = this.selectedUpaId;
        this.upasService.getUpaById(this.selectedUpaId).subscribe((data:any) => {
          this.nombreUpa = data.name;
        })
      } else {
        this.nombreUpaUser = this.idUpa;
      }

      if (!this.fechaInicio || !this.fechaFin) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, seleccione un rango de fechas para generar el reporte.',
        });
        return;
      }
      
      const datos = {
        fechaInicio: this.fechaInicio.toISOString(),
        fechaFin: this.fechaFin.toISOString(),
        variables: [] as string[],
        nombreUpa: this.nombreUpaUser
      };
  
      if (this.pHSelected) {
        datos.variables.push('PH');
      }
      if (this.temperaturaSelected) {
        datos.variables.push('Temp');
      }
      if (this.nivelAguaSelected) {
        datos.variables.push('N_Agua');
      }
      if (this.turbidezSelected) {
        datos.variables.push('Tu');
      }
      if (this.oxigenoDisueltoSelected) {
        datos.variables.push('O_Dis');
      }
      if (this.S_1Selected) {
        datos.variables.push('S_1');
      }
      
      if (!this.pHSelected && !this.temperaturaSelected && !this.nivelAguaSelected && !this.turbidezSelected && !this.oxigenoDisueltoSelected && !this.S_1Selected) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, seleccione al menos una opción de variable para generar el reporte.',
        });
        return;
      }
  
      const pdf = new PdfMakeWrapper();
      const data = await this.fetchData();
  
      pdf.pageSize('A4'); // Establece el tamaño de la página
      pdf.pageMargins([40, 60, 40, 60]); // Establece los márgenes de la página: [izquierda, superior, derecha, inferior]
  
      // Obtener la fecha actual
      const currentDate = new Date();
  
      // Formatear la fecha como 'AAAA-MM-DD'
      const formattedDate = currentDate.toISOString().slice(0, 10);
  
      pdf.add([
        {
          text: `Fecha del reporte: ${formattedDate}`,
          bold: false,
          fontSize: 10,
          alignment: 'right',
        }
      ]);
  
      pdf.add([
        {
          text: 'REPORTE DE VARIABLES',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 20, 0, 20], // Agrega un margen inferior para separar el título de la tabla
        }
      ]);
  
      pdf.add([
        {
          text: `Este informe corresponde a la UPA: ${this.nombreUpa}`,
          bold: false,
          fontSize: 16,
          alignment: 'center',
          margin: [0, 0, 0, 25], // Agrega un margen inferior para separar el título de la tabla
        }
      ]);
  
      // Crear una cadena de texto con las variables seleccionadas, separadas por comas
      const selectedVariablesText = datos.variables.join(', ');
  
      // Crear una cadena de texto con las fechas de inicio y fin
      const dateRangeText = `${datos.fechaInicio.slice(0, 10)} - ${datos.fechaFin.slice(0, 10)}`;
  
      pdf.add([
        {
          text: `En la siguiente tabla se evidencia el valor de las variables seleccionadas (${selectedVariablesText}) en el rango de fechas establecido (${dateRangeText})`,
          bold: false,
          fontSize: 13,
          alignment: 'left',
          margin: [10, 0, 0, 25], // Agrega un margen inferior para separar el texto de la tabla
        }
      ]);
    
      pdf.add(this.createTable(data, datos.variables));
    
      pdf.create().open();
    }
  }

  createTable(data: DataResponse[], selectedVariables: string[]): any {
    const headers = ['Fecha', ...selectedVariables];
    const tableBody = [headers, ...this.extractData(data, selectedVariables)];
    const numColumns = headers.length;
    const columnWidth = (100 / numColumns) + '%'; // Establece el ancho de las columnas en porcentaje
    const columnWidths = Array(numColumns).fill(columnWidth); // Crea un array con el ancho de cada columna
  
    return {
      table: {
        widths: columnWidths, // Agrega los anchos de las columnas
        headerRows: 1,
        body: tableBody,
      },
    };
  }

  extractData(data: DataResponse[], selectedVariables: string[]): TableRow[] {
    return data.map((row) =>
      [row.fecha, ...selectedVariables.map((variable) => row[variable])],
    );
  }

  async fetchData(): Promise<DataResponse[]> {

    if(this.rolUser == '1'){
      this.nombreUpaUser = this.selectedUpaId;
      this.upasService.getUpaById(this.selectedUpaId).subscribe((data:any) => {
        this.nombreUpa = data.name;
      })
    } else {
      this.nombreUpaUser = this.idUpa;
    }
    const datos = {
      fechaInicio: this.fechaInicio.toISOString(),
      fechaFin: this.fechaFin.toISOString(),
      variables: [] as string[],
      idUpa: this.nombreUpaUser
    };

    if (this.pHSelected) {
      datos.variables.push('PH');
    }
    if (this.temperaturaSelected) {
      datos.variables.push('Temp');
    }
    if (this.nivelAguaSelected) {
      datos.variables.push('N_Agua');
    }
    if (this.turbidezSelected) {
      datos.variables.push('Tu');
    }
    if (this.oxigenoDisueltoSelected) {
      datos.variables.push('O_Dis');
    }      
    if (this.S_1Selected) {
      datos.variables.push('S_1');
    }
  
    return fetch('https://shielded-everglades-04466.herokuapp.com/api/frame/getDataReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    }).then((response) => response.json());
  }

  validateSelection(): boolean {
    if (this.rolUser == 1 && !this.selectedUpaId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes seleccionar una UPA para generar el reporte o la gráfica',
      });
      return false;
    }
    return true;
  }

  onDownloadClick() {
    this.variables = []; // Reinicia el arreglo antes de llenarlo nuevamente

    if (this.pHSelected) this.variables.push('PH');
    if (this.temperaturaSelected) this.variables.push('Temp');
    if (this.nivelAguaSelected) this.variables.push('N_Agua');
    if (this.turbidezSelected) this.variables.push('Tu');
    if (this.oxigenoDisueltoSelected) this.variables.push('O_Dis');

    this.frameService.generateReport(this.variables, this.fechaInicio, this.fechaFin)
      .subscribe(
        (data) => {
          this.downloadFile(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}


