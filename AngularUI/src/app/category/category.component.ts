import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import {MatIconModule} from '@angular/material/icon';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../category';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input()
  category: Category;
  notes: Array<Note>;
  notesByCategory: Array<Note>;
  constructor(private router: RouterService, private categoryService: CategoryService,
     public dialog: MatDialog, private noteService: NotesService) { 
    this.notesByCategory = []; 
  }
  ngOnInit() {
  }
  /*routeToEditNoteView() {
    console.log('openEditNoteView');
    // open the view for edit by routing to edit opener
    this.router.routeToEditNoteView(this.category.id);
  }*/
  deleteCategory(){
    console.log('deleteCategory invoked - id:', this.category.id);
    this.categoryService.deleteCategory(this.category).subscribe(res => {}
      ,err => {
        console.log('Error', err.message);
    }); 
  }
  editCategory(){
    console.log('editCategory invoked :', this.category);
    this.dialog.open(UpdateCategoryComponent, {data: this.category}).afterClosed().subscribe(result => {
      this.router.routeToNoteView();
      });
  }
  getNotesByCategory(value: string){
    console.log('getNotesByCategory :', value);
    localStorage.setItem('CategoryName', value);
    this.router.routeToListView();
    this.router.routeToViewNotesByCategory();
    
  }
}