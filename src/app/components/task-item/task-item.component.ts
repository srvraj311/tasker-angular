import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../modals/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onDoubleClick: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  constructor() {}

  deleteTask(taskToDelete: Task): void {
    this.onDeleteTask.emit(taskToDelete);
  }

  switchReminder(task: Task): void {
    this.onDoubleClick.emit(task);
  }

  ngOnInit(): void {}
}
