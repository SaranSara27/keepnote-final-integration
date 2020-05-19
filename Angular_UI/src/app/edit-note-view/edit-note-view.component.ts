import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { Note } from '../note';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  categoryList;
  reminderList;
  selectedCategory;
  selectedReminder;
  errMessage: string;

  constructor(private matDialogRef: MatDialogRef<EditNoteViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private noteService: NotesService, private routerService: RouterService) {
  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.note);

    if(!this.note || !this.note.noteId) {
      this.matDialogRef.close();
      this.routerService.routeToDashboard();
      return;
    }

    if(sessionStorage.getItem('reminderList')) {
      this.reminderList = JSON.parse(sessionStorage.getItem('reminderList'));
    }

    if(sessionStorage.getItem('categoryList')) {
      this.categoryList = JSON.parse(sessionStorage.getItem('categoryList'));
    }
    console.log("Note ", this.note);
    this.selectedCategory = this.categoryList.find(category => category.id === this.note['category']['id']);
    this.selectedReminder = this.reminderList.find(reminder => reminder.reminderId === this.note['reminders'][0]['reminderId']);
  }

  onSave() {
    let requestParams = JSON.parse(JSON.stringify(this.note));
    requestParams['reminders'] = [];
    requestParams['reminders'].push(this.selectedReminder);
    requestParams['category'] = this.selectedCategory;

    this.noteService.editNote(requestParams).subscribe(editNote => {
        console.log("Success response", editNote);
        this.matDialogRef.close();
        this.routerService.routeBack();
    }, error => {
        console.log("error response");
        this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
    });
  }
  onClose()
{
  this.matDialogRef.close();
  this.routerService.routeToDashboard();
}
}
