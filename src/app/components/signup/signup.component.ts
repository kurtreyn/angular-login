import { Component, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { LoginSignupFormComponent } from '../login-signup-form/login-signup-form.component';
import { User } from '../../../userInterface'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  log!: any;
  public error: any = [];
  public success = null;
  public loading = false;
  @ViewChild('loginSignupForm') loginSignupForm!: LoginSignupFormComponent;

  constructor(private service: ApiService, private router: Router) { }

  onSubmit(user: User) {
    console.log('user: ', user)
    this.loading = true;
    if (!this.loading) {
      this.service.signUp(user).pipe(take(1)).subscribe({
        next: (data: User) => {
          this.handleResponse(data);
        },
        error: (err: any) => {
          this.handleError(err);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  handleResponse(data: any) {
    this.success = data.message;
    this.loginSignupForm.resetForm();
    alert('Signup successful');
    this.router.navigate(['/']);
  }


  handleError(error: any) {
    console.log('error', error)
    this.error = error.error.errors;
    alert('Signup failed');
  }
}
