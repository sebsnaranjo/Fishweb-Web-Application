import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  displayedColumns = ['from', 'datetime', 'send'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }


}
export interface Element {
  from: string;
  datetime: string;
  send: string;
}
const ELEMENT_DATA: Element[] = [
  {from: 'loperasofi@gmail.com',datetime: '8 de octubre',send:'El vergel'},

];
