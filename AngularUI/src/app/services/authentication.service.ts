import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthenticationService {
  private authUrl = 'http://localhost:8089/api/v1/auth/login/';
  constructor( public http: HttpClient ) {}
  authenticateUser(userId: string, userPassword: string) {
    console.log('inside authservice authenticate');
    console.log(this.authUrl, {userId: userId, userPassword: userPassword});
    return this.http.post<any>(this.authUrl, {userId: userId, userPassword: userPassword}, {
      headers: new HttpHeaders().set('Content-Type', `application/json`)
    });
  }
  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }
  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }
  setUserId(userId) {
    localStorage.setItem('UserId', userId);
  }
  getUserId() {
    return localStorage.getItem('UserId');
  }
  public isUserAuthenticated(token): Promise<boolean> {
    return this.http.post(`${this.authUrl}isAuthenticated`, {}, {
      headers: new HttpHeaders().set('authorization', `Bearer ${token}`)
    }).map((res) => res['isAuthenticated'] ).toPromise();
  }
  public isUserValid(token) {
    return this.http.post(`${this.authUrl}isAuthenticated`, {}, {
      headers: new HttpHeaders().set('authorization', `Bearer ${token}`)
    });
  }
}