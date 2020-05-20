import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-reminder-notes',
  templateUrl: './reminder-notes.component.html',
  styleUrls: ['./reminder-notes.component.css']
})
export class ReminderNotesComponent implements OnInit {
  notes: Array<Note>;
  notesByReminder: Array<Note>;
constructor(private noteService: NotesService, private authService: AuthenticationService, public routerService: RouterService) { 
    this.notesByReminder = [];
  }
  ngOnInit() {
      this.noteService.getNotes().subscribe(noteList =>  {
     
          for(let note of noteList){
            if(note.reminders !== null){
              this.notesByReminder.push(note);
            }
          }
          console.log('notesByReminder :', this.notesByReminder);
            this.notes = this.notesByReminder;
        });
  }
}