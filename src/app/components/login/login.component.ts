import { Component, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take, finalize } from 'rxjs/operators';
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
  public loading = false;
  @ViewChild('loginSignupForm') loginSignupForm!: LoginSignupFormComponent;

  constructor(private service: ApiService, private router: Router) { }

  onSubmit(user: User) {
    this.loading = true;
    console.log('user: ', user);
    console.log('loading start: ', this.loading);
    this.service.login(user).pipe(
      take(1),
      finalize(() => {
        this.loading = false;
        alert('Login successful');
        this.loginSignupForm.resetForm();
      })
    ).subscribe({
      next: (res) => console.log('res: ', res),
      error: (error) => this.handleError(error),
    });
    console.log('loading end: ', this.loading);
  }


  handleError(error: any) {
    console.log('error', error)
    this.error = error.error.errors;
    alert('Login failed');
  }

}
