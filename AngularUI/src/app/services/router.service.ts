import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Injectable()
export class RouterService {
  constructor( public router: Router,
    private location: Location) { }
  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }
  routeToLogin() {
    this.router.navigate(['login']);
  }
  routeToEditNoteView(noteId) {
    this.router.navigate(['dashboard', {
      outlets : {
        noteEditOutlet: ['note', noteId, 'edit']
      }
    }]);
  }
  routeBack() {
    this.location.back();
  }
  routeToListView() {
    this.router.navigate(['dashboard/view/listview']);
  }
  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview']);
  }
  routeToSignUp() {
    this.router.navigate(['signup']);
  }
  routeToViewNotes() {
    this.router.navigate(['viewnotes']);
  }
  routeToViewNotesByCategory() {
    this.router.navigate(['viewnotesbycategory']);
  }
  routeToViewReminders() {
    this.router.navigate(['viewNotesReminder']);
  }
}