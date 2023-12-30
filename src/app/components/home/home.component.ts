import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { User } from '../../../userInterface'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  localUsers!: User[];
  serverIsAwake: boolean = false;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.wakeUpServer();
  }

  fetchUsers() {
    this.service.getUsers().pipe(take(1)).subscribe({
      next: (data: User[]) => {
        this.localUsers = data;
      },
      error: (err: any) => {
        console.log('err: ', err);
      },
    });
  }

  wakeUpServer() {
    this.service.wakeUpServer().pipe(take(1)).subscribe({
      next: (res: any) => {
        console.log('res: ', res);
        if (res) {
          res === 'server ready' ? this.serverIsAwake = true : this.serverIsAwake = false;
        }
      },
      error: (err: any) => {
        console.log('err: ', err);
      },
    });
  }

  handleClick() {
    alert('clicked');
  }

  navigateTo() {
    this.router.navigate(['signup']);
  }
}