import { Injectable } from '@angular/core';
import { Reminder } from '../reminder';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable()
export class ReminderService {
  reminder: Reminder;
  reminders: Array<Reminder>;
  remindersSubject: BehaviorSubject<Array<Reminder>>;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.reminders = [];
    this.remindersSubject = new BehaviorSubject([]);
    this.reminder = new Reminder();
  }
  fetchRemindersFromServer() {
    console.log('inside fetchRemindersFromServer');
    if (this.authService.getUserId() !== null) {
      this.httpClient.get<Reminder[]>(`http://localhost:8081/api/v1/reminder`, {
        headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).subscribe(remindersResponse => {
        this.reminders = remindersResponse;
        this.remindersSubject.next(this.reminders);
      });
    }else {
      console.log('No User Loggedin');
    }
  }
  getReminders(): BehaviorSubject<Array<Reminder>> {
    return this.remindersSubject;
  }
  getReminderFromId(reminderId: String): Reminder {
    console.log('reminderId', reminderId);
    console.log('this.reminders', this.reminders);
    return this.reminders.find(reminder => reminder.reminderId === reminderId);
 }
 addReminder(reminder: Reminder): Observable<Reminder> {
  reminder.reminderCreatedBy = this.authService.getUserId();
  console.log('inside addReminder req=> ', reminder);
  return this.httpClient.post<Reminder>('http://localhost:8081/api/v1/reminder', reminder, {
    headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
  }).do(addReminders => {
    console.log('after addReminders in do', addReminders);
    this.reminders.push(addReminders);
    this.remindersSubject.next(this.reminders);
  });
}
deleteReminder(reminder: Reminder) {
  console.log('inside deleteReminder=> ', reminder);
  return this.httpClient.delete(`http://localhost:8081/api/v1/reminder/${reminder.reminderId}`,
  {
    headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
  }).do(deletedReminder => {
    console.log('inside deleteReminder', deletedReminder);
    const index = this.reminders.findIndex(deleteReminder => deleteReminder.id === reminder.reminderId);
    this.reminders.splice(index, 1);
    this.remindersSubject.next(this.reminders);
  });
}
getReminderById(reminder: Reminder) {
  console.log('inside getReminderById=> ', reminder);
  return this.httpClient.get<Reminder>(`http://localhost:8081/api/v1/reminder/${reminder.id}`,
  {
    headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
  });
}
editReminder(reminder: Reminder): Observable<Reminder> {
  console.log('reminder::', reminder);
  return this.httpClient.put<Reminder>(`http://localhost:8081/api/v1/reminder/${reminder.reminderId}`, reminder, {
    headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
  }).pipe(
    tap(editedReminder => {
      const reminderObj = this.reminders.find(data => data.id === editedReminder.id);
      Object.assign(reminderObj, editedReminder);
      this.remindersSubject.next(this.reminders);
    })
  );
}
}