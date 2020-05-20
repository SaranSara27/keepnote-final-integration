import { Injectable } from '@angular/core';
import { User } from '../user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }
  registerUserService(user: User) {
    console.log('inside user', user);
    return this.httpClient.post<User>('http://localhost:8080/api/v1/user',
     {userId: user.userId, userName: user.firstName, userPassword: user.userPassword, userMobile: user.userMobile}, {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }
  registerUserAuthService(user: User) {
    console.log('inside userauth', user);
    return this.httpClient.post<User>('http://localhost:8089/api/v1/auth/register',
     {userId: user.userId, userPassword: user.userPassword, firstName: user.firstName, lastName: user.lastName, userRole: user.userRole }, {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }
}