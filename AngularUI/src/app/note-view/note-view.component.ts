import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  notes: Array<Note>;
  constructor(private noteService: NotesService) { }
  ngOnInit() {
    this.noteService.getNotes().subscribe(note => {
      this.notes = note;
    });
  }
}