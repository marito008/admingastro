import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  //Variables
  progreso1: number = 20;
  progreso2: number = 30;

  constructor() { }

  ngOnInit() {
  }

}
