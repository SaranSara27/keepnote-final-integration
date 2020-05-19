export class Note {
  noteId: Number;
  noteTitle: string;
  noteContent: string;
  noteStatus: string;


  constructor() {
    this.noteTitle = '';
    this.noteContent = '';
    this.noteStatus = 'not-started';
  }
}
