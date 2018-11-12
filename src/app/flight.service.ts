import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FlightService {
  @Output() gotFlights = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {
  }

  airportAutocomplete(term: string) {
    return this.httpClient.get(`/api/flight/autocomplete/${term}`)
      .pipe(map(
        (locations: any[]) => {
          return locations.slice(-10);
        }
      ));
  }

  lowFareSearch(origin: {value: string, date: string}, destination: {value: string, date: string}, who: number, cabinClass: string) {
    return this.httpClient.get(`/api/flight/low-fare?origin=${origin.value}&destination=${destination.value}&departure_date=${origin.date}&return_date=${destination.date}&travel_class=${cabinClass}&adults=${who}`)
      .pipe(map(
        (flights: {results: any[]}) => {
          return flights
        }
      ))
  }

}
