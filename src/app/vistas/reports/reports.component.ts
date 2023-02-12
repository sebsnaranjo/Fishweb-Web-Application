import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  variables: FormGroup;
  panelOpenState = false;
  constructor(fb: FormBuilder) {
    this.variables = fb.group({
      ph: false,
      temperatura: false,
      nivelAgua: false,
    });
   }

  ngOnInit(): void {
    this.panelOpenState = false;
    console.log(this.panelOpenState)
  }

}
