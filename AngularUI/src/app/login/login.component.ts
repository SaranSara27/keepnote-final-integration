import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl,FormGroupDirective,Validators} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  submitMessage: String;
  private bearerToken: any;
  constructor( private  authService: AuthenticationService, private routerService: RouterService ) {
  }
  username = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
  password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]));
  loginSubmit() {
    console.log('inside login submit');
    this.authService.authenticateUser(this.username.value, this.password.value).subscribe(res => {
    console.log('res', res['token']);
    console.log('UserId', res['UserId']);
    this.authService.setBearerToken(res['token']);
    this.authService.setUserId(res['UserId']);
    console.log('before route guard');
    this.routerService.routeToDashboard();
        },
        err => {
             this.submitMessage = 'Unauthorized';
      }
      );
   }
   userSignup() {
    console.log('redirecting to userSignup');
    this.routerService.routeToSignUp();
   }
}
