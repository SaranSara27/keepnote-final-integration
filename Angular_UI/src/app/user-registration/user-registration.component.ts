import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  registrationSuccessFlag: boolean = false;
  errorMessage: string = '';
  roleList: Array<string> = ['Admin', 'Normal User'];

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.userRegistrationForm = this.fb.group({
      userId: ['', Validators.required],
      userPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userRole: ['', Validators.required]
    });
  }

  registerUser(formValue) {
    this.registrationSuccessFlag = false;
    this.errorMessage = '';

    if(this.userRegistrationForm && this.userRegistrationForm.valid) {
      const requestParams = JSON.parse(JSON.stringify(formValue));
      console.log("Request Params for User Registration ", requestParams);
    
      this.authService.registerUser(requestParams).subscribe(response => {
        if(response && response['status'] === 'Success') {
          this.registrationSuccessFlag = true;
          this.userRegistrationForm.reset();
          this.userRegistrationForm.markAsUntouched();
          this.userRegistrationForm.markAsPristine();
        } else {
          this.errorMessage = response && response['message'] ? response['message'] : "We are unable to register below user. Please try again later."
        }
      }, errorResponse => {
        this.errorMessage = errorResponse && errorResponse['error'] && errorResponse['error']['message'] ? errorResponse['error']['message'] :"We are unable to register below user. Please try again later."
      });
    }
  }

}