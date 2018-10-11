import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FlightService {
  constructor(private httpClient: HttpClient) {
  }

  airportAutocomplete(term: String) {
    return this.httpClient.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=pt2FV2cqI3GYbHb3GUaaicul1aDN57km&term=${term}`)
      .pipe(map(
        (locations: any[]) => {
          return locations.slice(-10);
        }
      ));
  }
}
