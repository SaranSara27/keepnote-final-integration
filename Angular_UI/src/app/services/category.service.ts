import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service'

@Injectable()
export class CategoryService {
  getAllCategoryUrl: string = 'http://localhost:8080/api/v1/category';
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAllCategoryByUserId() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    let formattedUrl = this.getAllCategoryUrl;
    return this.httpClient.get(formattedUrl, {
      headers : headers
    });
  }


  getCategoryById(categoryId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);
    let formattedUrl = this.getAllCategoryUrl + '/' + categoryId;
    return this.httpClient.get(formattedUrl, {
      headers : headers
    });
  }

  createCategory(requestParams) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.post('http://localhost:8080/api/v1/category', requestParams, {
      headers : headers
    });
  }

  deleteCategory(categoryId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.delete('http://localhost:8080/api/v1/category/' + categoryId, {
      headers : headers
    });
  }

  updateCategory(requestParams, categoryId) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`);

    return this.httpClient.put('http://localhost:8080/api/v1/category/' + categoryId, requestParams, {
      headers : headers
    });
  }
}
