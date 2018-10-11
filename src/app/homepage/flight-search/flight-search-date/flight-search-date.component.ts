import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-search-date',
  templateUrl: './flight-search-date.component.html',
  styleUrls: ['./flight-search-date.component.scss']
})
export class FlightSearchDateComponent implements OnInit {

  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
