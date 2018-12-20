import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

@Injectable({providedIn: 'root'})
export class FlightInspirationService {
  tokenType: string;
  accessToken: string;

  constructor(private httpClient: HttpClient, private auth: AuthService) {
  }

  getInspirations() {
    return this.httpClient.get('/api/flight/inspirations').pipe(map(
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