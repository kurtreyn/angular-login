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
  api_url: string = "https://javarenderserver.onrender.com/users"
  users_url: string = 'http://localhost:8080/users'; // restAPI_Java_Spring_Boot_Postgres

  form!: FormGroup;

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.api_url, user, httpOptions)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api_url)
  }
}