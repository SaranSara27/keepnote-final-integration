import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from '../note';
import {Category} from '../category';
import {Reminder} from '../reminder';
import { NotesService } from '../services/notes.service';
import { ReminderService } from '../services/reminder.service';
import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';
import { error } from 'util';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnDestroy {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  category: Category;
  reminder: Reminder;
  private categoriesList: Array<Category>;
  private remindersforView: Array<Reminder>;
  private selectedReminders: Array<String>;
  private remindersForNote: Array<Reminder>;
  
  constructor(private notesService : NotesService,
    private routes: RouterService, 
    private categoryService: CategoryService,
    private noteService: NotesService, private reminderService: ReminderService, 
    public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.selectedReminders = [];
    this.reminder = new Reminder();
    this.remindersForNote = [];
    //this.categoryService.fetchCategoriesFromServer();
    console.log("constructer EditNoteViewComponent");
    this.categoryService.getCategories().subscribe(categories =>  {
    console.log('categorylist - >',categories)
    this.categoriesList = categories;
    });
    console.log('inside edit note view', this.data);
    this.note = this.data;
    this.category = this.note.category;  
    
    //this.reminderService.fetchRemindersFromServer();
    console.log("loadReminders EditNoteViewComponent");
    this.reminderService.getReminders().subscribe(reminder =>  {
    console.log('reminder - >',reminder)
    this.remindersforView = reminder;
  });
  if(this.note.reminders !== null){
    if(this.note.reminders.length > 0){
      for(let rem of this.note.reminders){
      this.selectedReminders.push(rem.reminderName);
      }
      console.log('this.selectedReminders::', this.selectedReminders);
    }
  }   
}
  onSave() {
    if(this.category.id !== undefined){
      this.category = this.categoryService.getCategoryFromId(this.category.id);
      this.category.categoryId = this.category.id;
      this.note.category = this.category;
    }
    if(this.selectedReminders.length > 0){
      for(let reminderId of this.selectedReminders){
      this.reminder = this.reminderService.getReminderFromId(reminderId);
      console.log('this.reminder - >',this.reminder);
      this.remindersForNote.push(this.reminder);
      this.note.reminders = this.remindersForNote;
    }
  }
    let editedNote: Note;
    editedNote = new Note();
    editedNote.noteId = this.note.noteId;
    editedNote.noteTitle = this.note.noteTitle;
    editedNote.noteContent = this.note.noteContent;
    editedNote.noteStatus = this.note.noteStatus;
    editedNote.category = this.note.category
    editedNote.reminders = this.note.reminders;
    this.notesService.editNote(editedNote).subscribe(res => {
    }, err => {
      this.errMessage = err.message;
    });
    this.dialogRef.close();
}
ngOnDestroy() {
  this.routes.routeBack();
  this.noteService.fetchNotesFromServer();
}
}
