import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { AuthenticationService } from '../services/authentication.service';
import { CreateReminderComponent } from '../create-reminder/create-reminder.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: Note;
  category: Category;
  reminderNames: Array<String>;
  reminder: Reminder;
  constructor(private router: RouterService, private noteService: NotesService,public dialog: MatDialog, private auth: AuthenticationService) {
    this.reminderNames = [];
    this.reminder = new Reminder();
  }
  ngOnInit() {
    this.category = this.note.category;
    if (this.category === null) {
      this.category = new Category();
    }
    if (this.note.reminders !== null) {
      if (this.note.reminders.length > 0) {
        for (let rem of this.note.reminders) {
          this.reminderNames.push(rem.reminderName);
        }
        console.log('this.reminderNames::', this.reminderNames);
      }
    }
  }
  routeToEditNoteView() {
    console.log('openEditNoteView');
    this.router.routeToEditNoteView(this.note.noteId);
  }
  deleteNote() {
    console.log('deleteNote invoked - id:', this.note.noteId);
    this.noteService.deleteNote(this.note.noteId).subscribe(res => { }
      , err => {
        console.log('Error', err.message);
      });
  }
}