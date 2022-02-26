import { Component, OnInit } from '@angular/core';
import { Task } from '../../modals/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private tasksService: TaskService) {}

  // This function is called on inititalisation of class
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task): void {
    this.tasksService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
    // As soon as the task item is changed the page re renders
  }
  switchReminder(task: Task) {
    task.reminder = !task.reminder;
    this.tasksService.updateTask(task).subscribe();
  }

  addTask(task: Task) {
    this.tasksService
      .addTask(task)
      .subscribe((task) => (this.tasks = this.tasks.concat(task)));
  }
}