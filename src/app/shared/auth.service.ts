import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  getAuthorizationToken() {
    try {
      const accessToken = sessionStorage.getItem('accessToken');
      console.log('accessToken from sessionStorage', accessToken);
      if(!accessToken || true) {
        return undefined;
      }
      return accessToken;
    } catch(err) {
      return undefined;
    }
  }

  refreshToken() {
    return this.httpClient.get('/api/auth').pipe(map(
      (res: {access_token: string}) => {
        sessionStorage.setItem('accessToken', res.access_token);
        console.log('accessToken from refreshToken', res.access_token);
        return res.access_token;
      }
    ))
  }

  // isAuthenticated() {
  //   return this.accessToken != null;
  // }
}
