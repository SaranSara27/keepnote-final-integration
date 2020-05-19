import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service'

@Injectable()
export class ReminderService {
  getAllReminderUrl: string = 'http://localhost:8081/api/v1/reminder';
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAllReminders() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    let formattedUrl = this.getAllReminderUrl;
    return this.httpClient.get(formattedUrl, {
      headers : headers
    });
  }

  getRemindersById(reminderId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.get('http://localhost:8081/api/v1/reminder'+reminderId, {
      headers : headers
    });
  }

  createReminder(requestParams) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.post('http://localhost:8081/api/v1/reminder', requestParams, {
      headers : headers
    });
  }

  deleteReminder(reminderId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.delete('http://localhost:8081/api/v1/reminder/' + reminderId, {
      headers : headers
    });
  }

  updateReminder(requestParams, reminderId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.put('http://localhost:8081/api/v1/reminder/' + reminderId, requestParams, {
      headers : headers
    });
  }
}
