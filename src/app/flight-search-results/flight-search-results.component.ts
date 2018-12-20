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
  pending: boolean = false;

  outbound = {

  }

  inbound = {

  }

  constructor(private flightService: FlightService) {
    this.flightService.reqPending.subscribe(
      (isPending) => {
        this.pending = isPending;
      }
    );
    this.flightService.gotFlights.subscribe(
      (flights) => {
        this.pending = false;
        this.error = '';
        if(!flights) {
          this.flights = [];
          return;
        }
        flights.data.forEach(flight => {
          this.flights.push({
            outbounds: flight.offerItems[0].services[0].segments,
            inbounds: flight.offerItems[0].services[1].segments,
            price: flight.offerItems[0].price.total
          });
        });
        this.currency = flights.meta.currency;
      }
    );
    this.flightService.gotCriteria.subscribe(
      (criteria) => {
        this.criteria = criteria;
      }
    );
    this.flightService.gotError.subscribe(
      (error) => {
        this.pending = false;
        this.flights = [];
        this.error = error;
      }
    );
  }

  ngOnInit() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
