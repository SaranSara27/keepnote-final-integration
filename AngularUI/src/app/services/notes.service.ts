import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }
  fetchNotesFromServer() {
    console.log('inside fetchNotesFromServer ');
    this.httpClient.get<Note[]>(`http://localhost:8082/api/v1/note/${this.authService.getUserId()}`, {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(notesResponse => {
      this.notes = notesResponse;
      this.notesSubject.next(this.notes);
    });
  }
  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }
  addNote(note: Note): Observable<Note> {
    note.noteCreatedBy = this.authService.getUserId();
    console.log('inside note', note);
    return this.httpClient.post<Note>('http://localhost:8082/api/v1/note', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addNotes => {
      console.log('inside add notes', addNotes);
      this.notes.push(addNotes);
      this.notesSubject.next(this.notes);
    });
  }
  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:8082/api/v1/note/${this.authService.getUserId()}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(
      tap(editeNote => {
        const noteobj = this.notes.find(data => data.noteId === editeNote.noteId);
        Object.assign(noteobj, editeNote);
        this.notesSubject.next(this.notes);
      })
    );
  }
  getNoteById(noteId: number): Note {
     return this.notes.find(note => note.noteId === noteId);
  }
  deleteNote(noteId) {
    return this.httpClient.delete(`http://localhost:8082/api/v1/note/${this.authService.getUserId()}/${noteId}`,
    {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(deletedNote => {
      console.log('inside add notes', deletedNote);
      const index = this.notes.findIndex(deleteNote => deleteNote.noteId === noteId);
      this.notes.splice(index, 1);
      // this.notes.pop();
      this.notesSubject.next(this.notes);
    });
  }
}