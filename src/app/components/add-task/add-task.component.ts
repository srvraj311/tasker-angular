import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../modals/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text: string = '';
  day: string = '';
  reminder: boolean = false;

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  saveTask(): void {
    if (!this.text) {
      alert('Please add a Task');
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
