import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.scss']
})
export class FlightSearchResultsComponent implements OnInit {

  @Input() flights: any[];

  constructor() { }

  ngOnInit() {
  }

}
