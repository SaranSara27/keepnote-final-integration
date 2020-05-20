import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: NgForm;
  user: User;
  submitMessage: String;
  userId: String;
  userName: String;
  constructor(private router: RouterService, private userService: UserService) {
    this.user = new User();
  }
  ngOnInit() {}
  signUpUser(signUpForm: NgForm) {
     // console.log(signUpForm.value);
    this.userService.registerUserService(signUpForm.value).subscribe(res => {
      console.log('userid', res['userId']);
      this.submitMessage = 'Welcome User' + res['userName'] + ' Created Successfully.Proceed To Login';
      // this.userName = res['userName'];
    }, err => {
        console.log('Error', err.message);
        if ( err.message === 'Http failure response for http://localhost:8084/v1/user: 409 OK') {
          this.submitMessage = 'User Already Exists';
          alert('User Already Exists');
        }
    });
    this.userService.registerUserAuthService(signUpForm.value).subscribe(res => {
      console.log('Auth userid createdreated', res['userId']);
      // this.userId = res['userId'];
      alert(' User Id: ' + res['userId'] + ' Created Successfully!!! Proceed To Login');
    }
    , err => {
      console.log('Error', err.message);
    });
     signUpForm.reset();
   }
}