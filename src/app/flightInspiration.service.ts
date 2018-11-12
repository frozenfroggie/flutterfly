import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FlightInspirationService {

  constructor(private httpClient: HttpClient) {
  }

  getInspirations() {
    return this.httpClient.get('/api/flight/inspirations')
      .pipe(map(
        (res: any[]) => {
          return res
        }
      ))
  }

  placeSearch(city: string) {
    return this.httpClient.get(`/api/place/search/${city}`)
      .pipe(map(
        (res: {photo_reference: string}) => {
          return res
        }
      ))
  }

}
