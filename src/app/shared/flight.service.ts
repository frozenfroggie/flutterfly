import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FlightService {
  @Output() gotCriteria = new EventEmitter<any>();
  @Output() gotFlights = new EventEmitter<any>();
  @Output() gotError = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {
  }

  airportAutocomplete(term: string) {
    return this.httpClient.get(`/api/flight/autocomplete/${term}`)
      .pipe(map(
        (locations: any[]) => {
          // return locations.slice(-10);
          return locations
        }
      ));
  }

  lowFareSearch(airport: {origin: string, destination: string}, date: {origin: string, destination: string}, who: number = 1, cabinClass: string = 'ECONOMY', currency: string = 'EUR') {
    return this.httpClient.get(`/api/flight/low-fare?origin=${airport.origin}&destination=${airport.destination}&departure_date=${date.origin}&return_date=${date.destination}&travel_class=${cabinClass}&adults=${who}&currency=${currency}`)
      .pipe(map(
        (lowFareResponse: {results: any[]}) => {
          console.log(lowFareResponse);
          const searchCriteria = {
            airport: {
              origin: airport.origin,
              destination: airport.destination
            },
            date: {
              origin: date.origin,
              destination: date.destination
            },
            who,
            cabinClass,
            currency
          }
          return {lowFareResponse, searchCriteria}
        }
      ))
  }

}
