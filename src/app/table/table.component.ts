import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TodoItem } from '../interfaces/todo-item';
import { TodoService } from '../services/todo.service';
import { TableDataSource } from './table-datasource';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TodoItem>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['taskName', 'priority', 'done', 'delete'];
  constructor(private todoService: TodoService){}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.todoService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  getPriority(priority){
    switch(priority){
      case 0:
        return "Low";
      case 1:
        return "Medium"
      case 2:
        return "High"
    }
  }
  getTotalLength(){
    return this.todoService.getTotalLength();
  }

  deleteClick(element){
    this.todoService.deleteTodo(element.id);
  }

  changeDone(event, row){
    this.todoService.updateTodo({
      id: row.id,
      done: event.checked
    })
  }
}

export class CheckboxConfigurableExample {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
}


