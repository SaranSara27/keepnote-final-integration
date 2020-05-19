import { Component, OnInit } from '@angular/core';
import { NotesService } from './../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private notesSerivce: NotesService) {
    notesSerivce.fetchNotesFromServer();
   }

  ngOnInit() {
    
  }
}
