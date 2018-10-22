import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FlightService {
  constructor(private httpClient: HttpClient) {
  }

  airportAutocomplete(term: string) {
    return this.httpClient.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=pt2FV2cqI3GYbHb3GUaaicul1aDN57km&term=${term}`)
      .pipe(map(
        (locations: any[]) => {
          return locations.slice(-10);
        }
      ));
  }

  lowFareSearch(origin: {value: string, date: string}, destination: {value: string, date: string}, who: number, cabinClass: string) {
    return this.httpClient.get(`https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=pt2FV2cqI3GYbHb3GUaaicul1aDN57km&origin=${origin.value}&destination=${destination.value}&departure_date=${origin.date}&number_of_results=5${destination.date !== '' ? '&return_date=' + destination.date : ''}&adults=${who}&travel_class=${cabinClass}&currency=PLN`)
      .pipe(map(
        (flights: {results: any[]}) => {
          return flights
        }
      ))
  }

  getAirlaneLogo() {
    return this.httpClient.get('https://pics.avs.io/200/200/LX.png')
      .pipe(map(
        logo => {
          console.log(logo);
        }
      ))
  }
}
