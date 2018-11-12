import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.scss']
})
export class FlightSearchResultsComponent implements OnInit {
  title = 'flutterfly';
  flights: any[] = [];

  constructor(private flightService: FlightService) {
    this.flightService.gotFlights.subscribe(
      (flights) => this.flights = flights
    );
  }

  ngOnInit() {
  }

}
