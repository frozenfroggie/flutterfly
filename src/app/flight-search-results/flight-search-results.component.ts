import { Component, OnInit } from '@angular/core';
import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.scss']
})
export class FlightSearchResultsComponent implements OnInit {
  title = 'flutterfly';
  flights: any[] = [];
  criteria;
  currency: string = '';
  error: string = '';

  outbound = {

  }

  inbound = {

  }

  constructor(private flightService: FlightService) {
    this.flightService.gotFlights.subscribe(
      (flights) => {
        flights.forEach(flight => {
          this.flights.push({
            outbounds: flight.offerItems[0].services[0].segments,
            inbounds: flight.offerItems[0].services[1].segments,
            price: flight.offerItems[0].price.total
          });
        });
        // this.currency = flights.currency;
      }
    );
    this.flightService.gotCriteria.subscribe(
      (criteria) => {
        this.criteria = criteria;
      }
    );
    this.flightService.gotError.subscribe(
      (error) => this.error = error
    );
  }

  ngOnInit() {
  }

  calcFlightDurationFromISO(dateFrom: string, dateTo: string) {
    const dateOlder = new Date(dateFrom).getTime();
    const dateNewer = new Date(dateTo).getTime();
    const diff = (dateNewer - dateOlder) / 60000;
    const hrs = Math.floor(diff / 60);
    const min = Math.round(diff % 60);
    return hrs + "h " + min + "min";
  }

}
