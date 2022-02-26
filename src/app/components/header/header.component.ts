import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  title: string = 'Tasker';
  btnText: string = 'Add';
  newTaskHidden: boolean = true;
  @Output() onClickAdd = new EventEmitter();

  ngOnInit(): void {
    // When componets load, this is lifecycle method is called
  }
  toggleAddTask() {
    this.newTaskHidden = !this.newTaskHidden;
  }
}
