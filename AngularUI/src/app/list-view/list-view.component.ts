import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit{
  notes: Array<Note>;
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService : NotesService) {
    this.notes = [];
   }

   ngOnInit() {
    this.notesService.getNotes().subscribe(data => { // getting notes list
      this.notes = data;
      this.filternotes();
    });
  }
  // filtering the notes depending upon the status
  filternotes() {
    this.completedNotes = this.notes.filter(note => note.noteStatus === 'completed');
    this.startedNotes = this.notes.filter(note => note.noteStatus === 'started');
    this.notStartedNotes = this.notes.filter(note => note.noteStatus === 'not-started');
  }
}
