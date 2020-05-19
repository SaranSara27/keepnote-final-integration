import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReminderService } from './../services/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  errorMessage: string = '';
  reminderForm: FormGroup;
  reminderList;
  reminderEditId: string = '';

  constructor(private fb: FormBuilder, private reminderService: ReminderService) { }

  ngOnInit() {
    this.getAllReminders();
  }

  getAllReminders() {
    this.reminderForm = this.fb.group({
      reminderName: ['', Validators.required],
      reminderDescription: ['', Validators.required],
      reminderType: ['', Validators.required]
    });
    
    this.reminderForm.markAsUntouched();
    this.reminderForm.markAsPristine();
    this.reminderEditId = '';

    this.reminderService.getAllReminders().subscribe(response => {
      if(response) {
        this.reminderList = response;
      } else {
        this.reminderList = [];
        this.errorMessage =  response['errorMessage'];
      }
    }, error => {
      this.reminderList = [];
      this.errorMessage = error.errorMessage;
    });
  }

  createReminder(reminderForm) {
    if(reminderForm && reminderForm.valid) {
      const requestParams = reminderForm.value;
      this.errorMessage = '';
      
      this.reminderService.createReminder(requestParams).subscribe(response => {
        if(response && response['status'] === 'Success') {
          this.getAllReminders();
          } else {
           this.errorMessage = response['errorMessage'];
        }
      }, error => {
        
        this.errorMessage = error.errorMessage;
      });
    }
  }

  deleteReminder(reminder) {
    this.errorMessage = '';

    this.reminderService.deleteReminder(reminder.reminderId).subscribe(response => {
      if(response && response['status'] === 'Success') {
        this.reminderList = response['reminders'];
       
      } else {
       this.errorMessage = response['errorMessage'];
      }
    }, error => {
      this.errorMessage = error.errorMessage;
    });
  }

  editReminder(reminder) {
    this.reminderEditId = reminder['reminderId'];
  
    this.reminderForm = this.fb.group({
      reminderName: [reminder.reminderName, Validators.required],
      reminderDescription: [reminder.reminderDescription, Validators.required],
      reminderType: [reminder.reminderType, Validators.required]
    });
  }

  updateReminder(reminderForm) {
    if(reminderForm && reminderForm.valid) {
      const requestParams = reminderForm.value;
      this.errorMessage = '';
      
      this.reminderService.updateReminder(requestParams, this.reminderEditId).subscribe(response => {
        if(response && response['status'] === 'Success') {
         this.reminderList = response['reminders'];
        } else {
           this.errorMessage = response['errorMessage'];
        }
      }, error => {
        this.errorMessage = error.errorMessage;
        
      });
    }
  }
}
