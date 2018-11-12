import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-inspiration',
  templateUrl: './flight-inspiration.component.html',
  styleUrls: ['./flight-inspiration.component.scss']
})
export class FlightInspirationComponent implements OnInit {

  @Input() inspirations: any[];

  constructor() { }

  ngOnInit() {
  }

}
