import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-category-notes',
  templateUrl: './categorynote.component.html',
  styleUrls: ['./categorynote.component.css']
})
export class CategorynoteComponent implements OnInit {
  notes: Array<Note>;
  categoryName: string;
  notesByCategory: Array<Note>;
  constructor(private noteService: NotesService, private authService: AuthenticationService, public routerService: RouterService) {
    this.notesByCategory = [];
  }
  ngOnInit() {
    if (localStorage.getItem('CategoryName') !== null) {
      this.noteService.getNotes().subscribe(noteList =>  {
        console.log('noteList--', noteList);
      this.categoryName = localStorage.getItem('CategoryName');
          for (let note of noteList){
            if (note.category !== null) {
              if (note.category.categoryName === this.categoryName) {
                this.notesByCategory.push(note);
              }
            }
          }
          console.log('notesByCategory :', this.notesByCategory);
            this.notes = this.notesByCategory;
        });
      }
      localStorage.removeItem('CategoryName');
  }
}
