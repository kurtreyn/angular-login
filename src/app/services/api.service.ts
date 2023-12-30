import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../userInterface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public_users: string = "https://javarenderserver.onrender.com/users"
  local_users: string = 'http://localhost:8080/users';
  public_login_signup: string = "https://javarenderserver.onrender.com/login-signup"
  local_login_signup: string = 'http://localhost:8080/login-signup';

  form!: FormGroup;

  constructor(private http: HttpClient) { }

  loginSignup(user: User): Observable<User> {
    return this.http.post<User>(this.local_login_signup, user, httpOptions)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.local_users, httpOptions)
  }
}