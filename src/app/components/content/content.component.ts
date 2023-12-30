import { Component, OnInit, Input } from '@angular/core';
import { take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/userInterface';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],

})
export class ContentComponent implements OnInit {
  @Input() flexDir!: string;
  private _userList!: User[];

  @Input()
  set userList(userList: User[]) {
    this._userList = userList;
    console.log('userList: ', this._userList);
  }

  get userList(): User[] {
    return this._userList;
  }

  constructor(private service: ApiService, private router: Router) { }

  getFlexDir() {
    this.flexDir = this.flexDir.toLowerCase();
  }

  ngOnInit(): void {

  }

  deleteUser(id: string) {
    console.log('id: ', id);
    this.service.removeUser(Number(id)).pipe(
      take(1),
      finalize(() => {
        alert('User deleted');
      })
    ).subscribe({
      next: (data: User) => {
        console.log('data: ', data);
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

