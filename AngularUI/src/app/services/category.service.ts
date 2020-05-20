import { Injectable } from '@angular/core';
import { Category } from '../category';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable()
export class CategoryService {
  category: Category;
  categories: Array<Category>;
  categoriesSubject: BehaviorSubject<Array<Category>>;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.categories = [];
    this.categoriesSubject = new BehaviorSubject([]);
    this.category = new Category();
  }
  fetchCategoriesFromServer() {
    console.log('inside fetchCategoriesFromServer');
    if (this.authService.getUserId() !== null) {
      this.httpClient.get<Category[]>(`http://localhost:8083/api/v1/category/user/${this.authService.getUserId()}`, {
        headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).subscribe(categoriesResponse => {
        this.categories = categoriesResponse;
        this.categoriesSubject.next(this.categories);
      });
    }else {
      console.log('No User Loggedin');
    }
  }
  getCategories(): BehaviorSubject<Array<Category>> {
    console.log('cat service get cats', this.categoriesSubject);
    return this.categoriesSubject;
  }
  getCategoryFromId(categoryId: String): Category {
    return this.categories.find(category => category.id === categoryId);
 }
  addCategory(category: Category): Observable<Category> {
    category.categoryCreatedBy = this.authService.getUserId();
    console.log('inside category req=> ', category);
    return this.httpClient.post<Category>('http://localhost:8083/api/v1/category', category, {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addCategories => {
      console.log('after added Category in do', addCategories );
      this.categories.push(addCategories);
      this.categoriesSubject.next(this.categories);
    });
  }
  deleteCategory(category: Category) {
    console.log('inside deleteCategory=> ', category);
    console.log('categoryId=> ', category);
    return this.httpClient.delete(`http://localhost:8083/api/v1/category/${category.id}`,
    {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(deletedCategory => {
      console.log('inside delete category', deletedCategory);
      const index = this.categories.findIndex(deleteCategory => deleteCategory.id === category.id);
      this.categories.splice(index, 1);
      this.categoriesSubject.next(this.categories);
    });
  }
  getCategoryById(category: Category) {
    console.log('inside getCategoryById=> ', category);
   // console.log('categoryId=> ', categoryId);
    return this.httpClient.get<Category>(`http://localhost:8083/api/v1/category/${category.id}`,
    {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    });
  }
  editCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`http://localhost:8083/api/v1/category/${category.id}`, category, {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(
      tap(editedCategory => {
        const categoryObj = this.categories.find(data => data.id === editedCategory.id);
        Object.assign(categoryObj, editedCategory);
        this.categoriesSubject.next(this.categories);
      })
    );
  }
}