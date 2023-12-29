import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() usedAt!: string;
  @Input() loading!: boolean;
  @Output() btnClick = new EventEmitter();

  constructor() { }

  getUsedAt() {
    this.usedAt = this.usedAt.toLowerCase();
  }

  ngOnInit(): void { }

  onClick() {
    this.btnClick.emit();
  }
}
