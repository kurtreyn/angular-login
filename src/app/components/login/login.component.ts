import { Component, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { LoginSignupFormComponent } from '../login-signup-form/login-signup-form.component';
import { User } from '../../../userInterface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  log!: any;
  public error: any = [];
  public success = null;
  @ViewChild('loginSignupForm') loginSignupForm!: LoginSignupFormComponent;

  constructor(private service: ApiService, private router: Router) { }

  onSubmit(user: User) {
    console.log('user: ', user)
    this.service.signUp(user).subscribe(
      res => this.handleResponse(res),
      error => this.handleError(error)
    )
  }

  handleResponse(data: any) {
    console.log('child_component: loginSignupForm ', this.loginSignupForm)
    this.success = data.message;
    this.loginSignupForm.resetForm();
    alert('Login successful');
  }


  handleError(error: any) {
    console.log('error', error)
    this.error = error.error.errors;
    alert('Login failed');
  }

}
