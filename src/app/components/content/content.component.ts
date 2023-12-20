import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/userInterface';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],

})
export class ContentComponent implements OnInit {
  @Input() flexDir!: string;
  @Input() userList!: User[];

  constructor(private router: Router) { }

  getFlexDir() {
    this.flexDir = this.flexDir.toLowerCase();
  }

  ngOnInit(): void {
  }

  handleClick() {
    alert('clicked');
  }

  navigateTo() {
    this.router.navigate(['signup']);
  }
}

