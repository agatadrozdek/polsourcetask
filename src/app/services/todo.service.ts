import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  // TODO: replace this with real data from your application
  private EXAMPLE_DATA: TodoItem[] = [
    { taskName: 'Study', priority: 'High', done : false },
    { taskName: 'Cook dinner', priority: 'Medium', done : false },
    { taskName: 'Play games', priority: 'Low', done : true },
    { taskName: 'Cook breakfast', priority: 'Medium', done : true },
    { taskName: 'Cook dinner', priority: 'Medium', done : false },
    { taskName: 'Cook breakfast', priority: 'Medium', done : true },
    { taskName: 'Study', priority: 'High', done : false },
    { taskName: 'Read a book', priority: 'Low', done : false },
    { taskName: 'Study', priority: 'High', done : false },
    { taskName: 'Play games', priority: 'Low', done : true },
    { taskName: 'Cook dinner', priority: 'Medium', done : false },
    { taskName: 'Cook breakfast', priority: 'Medium', done : true },
    { taskName: 'Read a book', priority: 'Low', done : false },
    { taskName: 'Read a book', priority: 'Low', done : false },
    { taskName: 'Play games', priority: 'Low', done : true },
  ];
  

  constructor() { }

  private getSortedData(data: TodoItem[], sortAttribute, direction) {
    if (!sortAttribute || direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = direction === 'asc';
      switch (sortAttribute) {
        case 'taskName': return this.compare(a.taskName, b.taskName, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        case 'priority' : return this.compare(a.priority, b.priority, isAsc);
        default: return 0;
      }
    });
  }

  private getPagedData(data: TodoItem[], startIndex, pageSize) {
    return data.splice(startIndex, pageSize);
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getTodoList(options): Observable<TodoItem[]>{
    //console.log("Get page: ", startIndex, pageSize)
    return of(
      this.getPagedData(
        this.getSortedData(
          [...this.EXAMPLE_DATA],
          options.sortAttribute,
          options.sortDirection
        ),
        options.startIndex, 
        options.pageSize
      ));
  }

  getTotalLength(){
    return this.EXAMPLE_DATA.length;
  }
}
