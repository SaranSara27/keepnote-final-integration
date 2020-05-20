import { Component, OnInit } from '@angular/core';
import {Note} from '../note';
import { NotesService } from '../services/notes.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ViewChild } from '@angular/core/src/metadata/di';
import { FormControl } from '@angular/forms/src/model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  notes: Note[];
  note: Note;
  category: Category;
  reminder: Reminder;
  private categoriesList: Array<Category>;
  private remindersforView: Array<Reminder>;
  private selectedReminders: Array<String>;
  private remindersForNote: Array<Reminder>;
  
  constructor(private noteService: NotesService, private categoryService: CategoryService, private reminderService: ReminderService) {
    this.note = new Note();
    this.category = new Category();
    this.reminder = new Reminder();
    this.notes = [];
    this.selectedReminders = [];
    this.remindersForNote = [];
  }
  ngOnInit() {
    this.noteService.getNotes().subscribe(notesRepsonseList =>  {
      this.notes = notesRepsonseList;
    }, error => {
      this.errMessage = error.message;
      console.log(error.message);
    });
    this.categoryService.fetchCategoriesFromServer();
    console.log('ngOnInit NoteTakerComponent');
    this.categoryService.getCategories().subscribe(categories =>  {
    console.log('categorylist - >', categories);
    this.categoriesList = categories;
    });
    this.reminderService.fetchRemindersFromServer();
    // console.log("loadReminders app component");
    this.reminderService.getReminders().subscribe(reminder =>  {
    console.log('reminder - >', reminder);
    this.remindersforView = reminder;
  });
  }
  addNoteToDB() {
    console.log('takeNote - >');
    if(this.category.id !== undefined){
      this.category = this.categoryService.getCategoryFromId(this.category.id);
      this.category.categoryId = this.category.id;
      this.note.category = this.category;
    }
    if (this.selectedReminders.length > 0) {
      for (let reminderId of this.selectedReminders){
        console.log('******', reminderId);
      this.reminder = this.reminderService.getReminderFromId(reminderId);
      console.log('this.reminder - >', this.reminder);
      this.remindersForNote.push(this.reminder);
    }
    console.log('remindersForNote - >', this.remindersForNote);
    this.note.reminders = this.remindersForNote;
  }
    if (this.note.noteTitle === '' && this.note.noteContent === '') {
      this.errMessage = 'Title and Text both are required fields';
    }
    if (this.note.noteTitle !== '' && this.note.noteContent !== '') {
    this.errMessage = '';
    this.note.noteStatus = 'not-started';
    console.log('this.note - >', this.note);
    this.noteService.addNote(this.note).subscribe(addedNote =>  {
      this.remindersForNote = [];
    }, error => {
      this.errMessage = error.message;
      const index = this.notes.findIndex(note => note.noteId === this.note.noteId);
      this.notes.splice(index, 1);
    });
    this.note = new Note();
    this.note.noteTitle = '';
    this.note.noteContent = '';
   }
}
}