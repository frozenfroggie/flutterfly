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
  currency: string = '';
  error: string = '';

  constructor(private flightService: FlightService) {
    this.flightService.gotFlights.subscribe(
      (flights) => {
        this.flights = flights.results;
        this.currency = flights.currency;
      }
    );
    this.flightService.gotError.subscribe(
      (error) => this.error = error
    );
  }

  ngOnInit() {
  }

}
