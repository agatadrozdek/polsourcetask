import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      priority: ["1", []],
      taskName: ["", []]
    })
  }

  onSubmit(value){
    this.todoService.addTodo({
      id: -1,
      done: false,
      priority: Number(value.priority),
      taskName: value.taskName
    })
    this.router.navigateByUrl("/table");
  }
}
