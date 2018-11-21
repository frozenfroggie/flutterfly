import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-inspiration',
  templateUrl: './flight-inspiration.component.html',
  styleUrls: ['./flight-inspiration.component.scss']
})
export class FlightInspirationComponent implements OnInit {

  @Input() inspirations: any[];

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit() {
  }

  flightSearch({departure_date, return_date, destination, origin}: {departure_date: string, return_date: string, destination: string, origin: string}) {

    const airport: {origin: string, destination: string} = {
      origin,
      destination
    }

    const date: {origin: string, destination: string} = {
      origin: departure_date,
      destination: return_date
    }

    this.router.navigate(['flights']);
    this.flightService.lowFareSearch(airport, date)
      .subscribe(
        (flights) => {
          this.flightService.gotFlights.emit(flights);
        },
        (err) => {
          if(err.error && err.error.msg) {
            this.flightService.gotError.emit(err.error.msg);
          }
        }
      )
  }
}
