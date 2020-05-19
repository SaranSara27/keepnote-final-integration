import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service'

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  note: Note;
  errMessage: string;
  states: Array<string> = ['not-started', 'started', 'completed'];
  categoryList;
  reminderList;
  selectedCategory;
  selectedReminder;
  @ViewChild("noteTakerForm") noteTakerForm;

  constructor(private noteService: NotesService, private reminderService: ReminderService, private categoryService: CategoryService) {
    this.note = new Note();
  }

  ngOnInit() {
    this.note = new Note();

    this.reminderService.getAllReminders().subscribe(response => {
      if(response) {
        this.reminderList = response;
        sessionStorage.setItem("reminderList", JSON.stringify(this.reminderList));
      } else {
        this.reminderList = [];
        this.errMessage = 'We are unable to fetch the reminder list. Please try again later';
      }
    }, error => {
      this.reminderList = [];
      this.errMessage = 'We are unable to fetch the reminder list. Please try again later';
    });

    this.categoryService.getAllCategoryByUserId().subscribe(response => {
      this.categoryList = response;
      if(response) {
        this.categoryList = response;
        sessionStorage.setItem("categoryList", JSON.stringify(this.categoryList));
      } else {
        this.categoryList = [];
        this.errMessage = 'We are unable to fetch the category list. Please try again later.';
      }
    }, error => {
      this.categoryList = [];
      this.errMessage = 'We are unable to fetch the category list. Please try again later.';
    });
  }

  takeNote() {
    if(this.noteTakerForm && this.noteTakerForm.valid) {
      this.errMessage = '';
      let requestParams = JSON.parse(JSON.stringify(this.note));
      requestParams['reminders'] = [];
      requestParams.reminders.push(this.selectedReminder);
      requestParams['category'] = this.selectedCategory;

      this.noteService.addNote(requestParams).subscribe(addedNote => {
          this.note = new Note();
          this.selectedCategory = null;
          this.selectedReminder = null;
          this.noteService.fetchNotesFromServer();
        },
        error => {
          this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
        }
      );
      this.noteTakerForm.resetForm();
    } else {
      this.errMessage = 'Please enter all required fields.';
    }
  }

}
