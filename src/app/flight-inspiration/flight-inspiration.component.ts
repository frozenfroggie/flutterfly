import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-flight-inspiration',
  templateUrl: './flight-inspiration.component.html',
  styleUrls: ['./flight-inspiration.component.scss']
})
export class FlightInspirationComponent implements OnInit {
  @Input() error: string;
  @Input() pending: boolean;
  @Input() inspirations: any[];
  @Input() inspirationToFocus: string;

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit() {
  }

  flightSearch({departureDate, returnDate, destination, origin}: {departureDate: string, returnDate: string, destination: string, origin: string}) {

    const airport: {origin: string, destination: string} = {
      origin,
      destination
    }

    const date: {origin: string, destination: string} = {
      origin: departureDate,
      destination: returnDate
    }

    this.router.navigate(['flights']);
    setTimeout(() => { // make it asynchronous
      this.flightService.gotCriteria.emit({ who: 1, cabinClass: 'ECONOMY', airport, date });
      this.flightService.reqPending.emit(true);
    });
    this.flightService.lowFareSearch(airport, date)
      .subscribe(
        ({lowFareResponse}) => {
          this.flightService.gotFlights.emit(lowFareResponse);
        },
        (err) => {
          if(err.error && err.error.msg) {
            this.flightService.gotError.emit(err.error.msg);
          }
        }
      )
  }
}
