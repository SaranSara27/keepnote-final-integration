import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  noteStatusMap = {
    'not-started': 'Not Started',
    'started': 'Started',
    'completed': 'Completed'
  };
  constructor(private routerService: RouterService) { }

  ngOnInit() {

  }

  OpenEditNoteView() {
    this.routerService.routeToEditNoteView(this.note.noteId);
  }
}
