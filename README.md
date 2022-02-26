# Tasket - Angular

### A simple task app build with Angular

# What i learned in Angular (Notes)

## Installing

```tsx
npm install -g @angular/cli
```

## Creating a new Project

```tsx
ng new projectName
```

## Run Development Server

```html
ng serve -o
```

## Create a componet

```html
ng generate component folder/componentName
```

## Create a Service

```html
ng generate component folder/service
```

## Components

Components : Actual Views with their controller in TS files.

Every component have 4 files. Let component name be task

1. task.component.ts - Main TS file for logic and TS code
2. task.component.html - html for actual body
3. task.component.css - styling file for same
4. task.component.spec.ts - testing file

## Services

Services : Services files where we define business logic functions
Contains 2 files :

1. task.service.ts
2. task.service.spec.ts

## Common Angular attributes to remember

[ngStyle] - attributes enables inline styling.
[ngClass] - attributes enables class change based on booleans. Eg. <div [ngClass]="{ reminder: task.reminder }" where task.reminder is a boolean

\*ngFor - Allows to run a for loop ,Syntax -

```html
*ngFor="let task of taskList" // Where task is temprory loop variable and
taskList is the actual array the task variable is accesible to all child of the
tag in which loop is running
```

ngModel - (Enabled after importing FormsModule in app.module.ts)

This helps for two-way data binding in component’s ts and htm, Syntax = [(ngModel)] = “text” where the “text” should be same as name of the component.

## Components in Details

### TypeScript

```tsx
import { Component, OnInit } from "@angular/core";
import { Task } from "../../modals/Task";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-tasks", // The actual name of the tag to use in html
  templateUrl: "./tasks.component.html", // HTML page where it links
  styleUrls: ["./tasks.component.css"], // CSS sheets which are imported
})

// The class is the actual Component
export class TasksComponent implements OnInit {
  // The below variables are state variables, which when changes page re renders.
  tasks: Task[] = [];

  // Constructor has a Service injected to the component
  constructor(private tasksService: TaskService) {}

  // This function is called on inititalisation of class
  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  // This is a custom method to be called from within the html
  deleteTask(task: Task): void {
    this.tasksService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
    // As soon as the task item is changed the page re renders
  }
}
```

### HTML

```html
// Here app-task-item is another component which is being used in html file
<app-task-item
  *ngFor="let task of tasks"
  [task]="task"
  (onDeleteTask)="deleteTask(task)"
>
</app-task-item>
```

### CSS

```css
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid rgb(63, 63, 63);
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

## Passing values between componets.

### `Passing Down`

To pass a value to a component,

when a component is being used in html, as above app-task-item is being called in app-task

we can add custom attributes to tag which will pass data to the component.

eg.

```html
<component-small value="sampleValue" value2="{{tsVariable}}"
  ><c/component-small></component-small
>
```

In the Component’s TS file, we need to do some changes in order to work with this values

We need to import ‘Input’ from ‘@angular/core’

```tsx
import { Component, OnInit, Input } from "@angular/core";
```

After inporting , in the class we can instantiate a variable with annotating it with Input. Eg.

```tsx
@Input() value:string = ''; // Empty instanciated variable
or
@Input() value!:string; // Non initialising variable
```

### `Passing Up`

To pass a value we need to import two more variables, Output and EventEmitter.

```tsx
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
```

Upon this we can output any property of class to outside of component.

Eg.

```tsx
@Output onClickHandler():string = new EventEmitter();

handleClick(param1: string):void{
	this.onClickHandler.emit(param1);
}
```

To catch the following in the HTML we need to do this.

# `SOME DOUBTS HERE`

```html
<app-task-item
  (onClickHandler)="customFunction(param1)"
  <--
  the
  onClickHandler
  function
  will
  be
  transferred
  to
  customFunction()
  in
  other
  componet.
  this
  will
  create
  a
  callback
  type
  of
  function.
  --
>
  ></app-task-item
>
```

## Making HTTP calls in Angular Component/Service

`Step 1`

Add following in app.module.ts

```tsx
import { HttpClientModule } from "@angular/common/http";
```

`Step 2`

in the imports, add HttpClientModule

```tsx
imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    **HttpClientModule,**
  ],
```

`Step 3`

Add the following in the Service you want to add http req

```tsx
import { HttpClient, HttpHeaders } from "@angular/common/http";
```

`Step 4:`

Create a variable with your url

```tsx
apiUrl:string = "http://localhost:3000/tasks
```

`Step 5`

Add a constructor parameter for Injecting HttpModule into service

```tsx
  constructor(private http: HttpClient) {}
```

`Step 6`

In the class, create a function with Observatble<T> type return type, like getTask() here

```tsx
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
```

`Step 7`

To handle the observable when getTask is called, Here the function is called in ngOnInit() function as it is required to be called before loading of the page.

the function is called with a subscribe post function which is like a promise, we can handle the recieving object inside this in an arrow function.

One can change component properties here so that the page re renders after the call is succesfull called.

```tsx
ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
```
