import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../modals/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(tasks: Task): Observable<Task> {
    const url = `${this.apiUrl}/${tasks.id}`;
    return this.http.delete<Task>(url);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
}
