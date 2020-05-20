import { Component, OnInit } from '@angular/core';
import { RouterService } from './services/router.service';
import { MatDialog } from '@angular/material';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { AuthenticationService } from './services/authentication.service';
import { Category } from './category';
import { CategoryService } from './services/category.service';
import { ReminderService } from './services/reminder.service';
import { CreateReminderComponent } from './create-reminder/create-reminder.component';
import { Reminder } from './reminder';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
events: string[] = [];
opened: boolean;
categories: Array<Category>;
reminders: Array<Reminder>;
//private rolesList : string[];
constructor(public routerService: RouterService, public dialog: MatDialog, private authService: AuthenticationService, 
  private categoryService: CategoryService, private reminderService: ReminderService) {
    console.log("Constructor app component");
    //this.rolesList = ['Admin','Developer','Guest','User'];
}
ngOnInit() {   
  console.log("ngOnInit app component");
  //this.categoryService.fetchCategoriesFromServer();
  /*this.categoryService.getCategories().subscribe(category =>  {
  console.log('category - >',category)
  this.categories = category;
  }); */
  this.loadCategories();
  this.loadReminders();
  /*this.reminderService.getReminders().subscribe(reminder =>  {
    console.log('reminder - >',reminder)
    this.reminders = reminder;
    });*/
}
getNotesView(){
  console.log("getNotesView called");
  this.routerService.routeToNoteView();
}
getViewNotes(){ // for test
  console.log("getViewNotes called");
  this.routerService.routeToViewNotes();
}
getNotesReminderView(){
  this.routerService.routeToViewReminders();
}
addCategory(){
  console.log("addCategory called -- checking");
  if(this.authService.getBearerToken() !== null){
    this.authService.isUserValid(this.authService.getBearerToken()).subscribe(res => {
      if(res['isAuthenticated'] === 'true'){
      console.log('inside if isAuthenticated true');
      /* Our Action */
      this.dialog.open(CreateCategoryComponent, {}).afterClosed().subscribe(result => {
        this.routerService.routeToNoteView();
        });
      }else{
        console.log('Invalid User - isAuthenticated - > false');
        this.routerService.routeToLogin();
      }},
      err => {
        this.routerService.routeToLogin();
    });
  }else{
      console.log('Invalid User - No Token');
      this.routerService.routeToLogin();
  }  
}
loadCategories(){
  this.categoryService.fetchCategoriesFromServer();
  console.log("load categories app component");
  this.categoryService.getCategories().subscribe(category =>  {
    console.log('category - >',category)
    this.categories = category;
  });
}
loadReminders(){
  this.reminderService.fetchRemindersFromServer();
  console.log("loadReminders app component");
  this.reminderService.getReminders().subscribe(reminder =>  {
    console.log('reminder - >',reminder)
    this.reminders = reminder;
  });
}
addReminder(){
  console.log("addReminder called -- checking");
  if(this.authService.getBearerToken() !== null){
    this.authService.isUserValid(this.authService.getBearerToken()).subscribe(res => {
      if(res['isAuthenticated'] === 'true'){
      console.log('inside if isAuthenticated true');
      /* Our Action */
      this.dialog.open(CreateReminderComponent, {}).afterClosed().subscribe(result => {
        this.routerService.routeToNoteView();
        });
      }else{
        console.log('Invalid User - isAuthenticated - > false');
        this.routerService.routeToLogin();
      }},
      err => {
        this.routerService.routeToLogin();
    });
  }else{
      console.log('Invalid User - No Token');
      this.routerService.routeToLogin();
  }  
}
}