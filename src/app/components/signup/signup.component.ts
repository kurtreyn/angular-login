import { Component, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { take, finalize } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { LoginSignupFormComponent } from '../login-signup-form/login-signup-form.component';
import { User } from '../../../userInterface'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  log!: any;
  public error: any = [];
  public success = null;
  public loading = false;
  @ViewChild('loginSignupForm') loginSignupForm!: LoginSignupFormComponent;

  constructor(private service: ApiService, private router: Router) { }

  onSubmit(user: User) {
    this.loading = true;
    console.log('user: ', user);
    console.log('loading start: ', this.loading);
    this.service.signUp(user).pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        alert('Signup successful');
        this.loginSignupForm.resetForm();
      })
    ).subscribe({
      next: (res) => console.log('res: ', res),
      error: (error) => this.handleError(error),
    });
    console.log('loading end: ', this.loading);
  }

  handleResponse(data: any) {
    this.success = data.message;
    this.loginSignupForm.resetForm();
    alert('Signup successful');
  }


  handleError(error: any) {
    console.log('error', error)
    this.error = error.error.errors;
    alert('Signup failed');
  }
}
