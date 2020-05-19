import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {
    username = new FormControl('', [ Validators.required ]);
    password = new FormControl('', [ Validators.required ]);

    public bearerToken: any;
    submitMessage = '';

    constructor(private authservice: AuthenticationService, private routerService: RouterService) { }

    loginSubmit() {
      if(this.username.value && this.password.value) {
        const requestParams = {
          'userId' : this.username.value,
          'userPassword' : this.password.value
        };
  
        this.authservice.authenticateUser(requestParams).subscribe( res => {
          if(res && res['status'] === 'Success'){
            console.log("Success");
            console.log(res['token']);
            this.bearerToken = res['token'];
            sessionStorage.setItem("userId", res['userId']);
            this.authservice.setBearerToken(this.bearerToken);
            this.routerService.routeToDashboard();
          }
          else {
            this.submitMessage = 'error';
          }
        }, err => {
          this.submitMessage = err.error ? err.error.message : err.message;
        });
      }
    }

    get_username_error() {
      return this.username.hasError('required') ? 'User Name is required' : '';
    }

    get_password_error() {
      return this.password.hasError('required') ? 'Password is required' : '';
    }
}