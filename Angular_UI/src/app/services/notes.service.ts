import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {tap} from 'rxjs/operators';

@Injectable()
export class NotesService {
  token: any;
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  getAllNotesUrl: string = 'http://localhost:8082/api/v1/note';


  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {
    this.token = this.authService.getBearerToken();
    const headers = new HttpHeaders().set('Authorization',
    `Bearer ${this.authService.getBearerToken()}`);
    let formattedUrl = this.getAllNotesUrl + '/' + sessionStorage.getItem('userId');
    
    this.httpClient.get<Array<Note>>(formattedUrl, {
      headers : headers
    }).subscribe(notes  => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.post('http://localhost:8082/api/v1/note', note, {
      headers : headers
    });
  }

  editNote(note) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    const formattedUrl = 'http://localhost:8082/api/v1/note/' + sessionStorage.getItem('userId') + '/' + note.noteId;
    return this.httpClient.put(formattedUrl, note, {
      headers : headers
    }).pipe(tap(editedNote => {
      const existingNote = this.notes.find(noteValue => noteValue.noteId === editedNote['noteId']);
      Object.assign(existingNote, editedNote);
      this.notesSubject.next(this.notes);
   }));
  }

  getNoteById(noteId: number): Note {
    const note = this.notes.find(note => note.noteId === noteId);
    return Object.assign({}, note);
  }

}
