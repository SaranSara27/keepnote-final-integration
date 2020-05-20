import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../category';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  
  errMessage: string;
  category: Category;
  categories: Category[];
  constructor(private categoryService: CategoryService, public dialogRef: MatDialogRef<UpdateCategoryComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.category = this.data;
      this.categories = [];
    }
  ngOnInit() {
    console.log('category ngOnInit - UpdateCategoryComponent');
  }
  editCategory() {
    console.log('Inside editCategory');
    if (this.category.categoryName === '' && this.category.categoryDescription === '') {
      this.errMessage = 'Title and Text both are required fields';
    }
    if (this.category.categoryName !== '' && this.category.categoryDescription !== '') {
    this.errMessage = '';
    this.categoryService.editCategory(this.category).subscribe(addedCategory =>  {
    }, error => {
      this.errMessage = error.message;
      const index = this.categories.findIndex(category => category.id === this.category.id);
      this.categories.splice(index, 1);
    });
   }
   this.dialogRef.close();
  }
}