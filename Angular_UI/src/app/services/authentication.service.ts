import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticateUser(data) {
    console.log("inside authenticateuser");
    return this.httpClient.post('http://localhost:8089/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post('http://localhost:8089/api/v1/auth/login', {}, {
      headers : headers
    }).pipe(map((res) => res['isAuthenticated'])).toPromise();
  }

  registerUser(data) {
    return this.httpClient.post('http://localhost:8089/api/v1/auth/register', data);
  }
}
