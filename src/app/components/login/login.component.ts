import { Component, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
    console.log('user: ', user)
    this.loading = true;
    if (!this.loading) {
      this.service.signUp(user).pipe(take(1)).subscribe({
        next: (res) => this.handleResponse(res),
        error: (error) => this.handleError(error),
        complete: () => this.loading = false
      });
    }
  }

  handleResponse(data: any) {
    console.log('child_component: loginSignupForm ', this.loginSignupForm)
    this.success = data.message;
    this.loginSignupForm.resetForm();
    alert('Login successful');
    this.router.navigate(['/']);
  }


  handleError(error: any) {
    console.log('error', error)
    this.error = error.error.errors;
    alert('Login failed');
  }

}
