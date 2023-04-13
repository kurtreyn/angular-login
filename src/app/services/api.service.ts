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
  users_url: string = ' http://localhost:3000/users';
  form!: FormGroup;

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.users_url, user, httpOptions)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.users_url)
  }
}