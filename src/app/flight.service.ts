import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FlightService {
  @Output() gotFlights = new EventEmitter<any>();
  @Output() gotError = new EventEmitter<any>();

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

  lowFareSearch(airport: {origin: string, destination: string}, date: {origin: string, destination: string}, who: number, cabinClass: string) {
    return this.httpClient.get(`/api/flight/low-fare?origin=${airport.origin}&destination=${airport.destination}&departure_date=${date.origin}&return_date=${date.destination}&travel_class=${cabinClass}&adults=${who}`)
      .pipe(map(
        (flights: {results: any[]}) => {
          return flights
        }
      ))
  }

}
