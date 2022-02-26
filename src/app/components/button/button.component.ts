import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  constructor() {}
  @Input() text: string = '';
  @Input() color: string = '';
  @Output() btnClick = new EventEmitter();
  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
