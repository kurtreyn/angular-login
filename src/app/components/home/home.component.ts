import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../../userInterface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      res => console.log('res: ', res),
      // res => this.handleResponse(res),
      // error => this.handleError(error)
    )
  }

  handleClick() {
    alert('clicked');
  }

  navigateTo() {
    this.router.navigate(['signup']);
  }
}