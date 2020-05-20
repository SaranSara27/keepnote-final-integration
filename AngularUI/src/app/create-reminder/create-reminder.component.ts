import { Component, OnInit, Inject } from '@angular/core';
import { Reminder } from '../reminder';
import { error } from 'util';
import { ReminderService } from '../services/reminder.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-create-reminder',
  templateUrl: './create-reminder.component.html',
  styleUrls: ['./create-reminder.component.css']
})
export class CreateReminderComponent implements OnInit {
  
  errMessage: string;
  reminders: Reminder[];
  reminder: Reminder;
  constructor(private reminderService: ReminderService, public dialogRef: MatDialogRef<CreateReminderComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reminder = new Reminder();
    this.reminders = [];
     }
  ngOnInit() {
    console.log('category ngOnInit - CreateReminderComponent');
  }
  saveReminder() {
    console.log('Inside saveReminder');
    if (this.reminder.reminderName === '' && this.reminder.reminderDescription === ''  && this.reminder.reminderType === '') {
      this.errMessage = 'Name ,Desc, Type are required fields';
    }
    if (this.reminder.reminderName !== '' && this.reminder.reminderDescription !== '' && this.reminder.reminderType !== '') {
    this.errMessage = '';
    this.reminderService.addReminder(this.reminder).subscribe(addedReminder =>  {
    }, error => {
      this.errMessage = error.message;
      const index = this.reminders.findIndex(reminder => reminder.id === this.reminder.id);
      this.reminders.splice(index, 1);
    });
   }
   this.dialogRef.close();
  }
}