import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';


const storageName = "TodoList";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // TODO: replace this with real data from your application
  private EXAMPLE_DATA: TodoItem[] = [
    {id: 1, taskName: 'Study', priority: 2, done : false },
    {id: 2, taskName: 'Cook dinner', priority: 1, done : false },
    {id: 3, taskName: 'Play games', priority: 0, done : true },
    {id: 4, taskName: 'Cook breakfast', priority: 1, done : true },
    {id: 5, taskName: 'Cook dinner', priority: 1, done : false },
    {id: 6, taskName: 'Cook breakfast', priority: 1, done : true },
    {id: 7, taskName: 'Study', priority: 2, done : false },
    {id: 8, taskName: 'Read a book', priority: 0, done : false },
    {id: 9, taskName: 'Study', priority: 2, done : false },
    {id: 10, taskName: 'Play games', priority: 0, done : true },
    {id: 11, taskName: 'Cook dinner', priority: 1, done : false },
    {id: 12, taskName: 'Cook breakfast', priority: 1, done : true },
    {id: 13, taskName: 'Read a book', priority: 0, done : false },
    {id: 14, taskName: 'Read a book', priority: 0, done : false },
    {id: 15, taskName: 'Play games', priority: 0, done : true },
  ];

  private dataObservable: BehaviorSubject<TodoItem[]>;

  constructor() { 
    this.EXAMPLE_DATA = JSON.parse(localStorage.getItem(storageName)) || [];
    this.dataObservable = new BehaviorSubject(this.EXAMPLE_DATA);
    
  }
  private updateStorage(){
    localStorage.setItem(storageName, JSON.stringify(this.EXAMPLE_DATA));
    this.dataObservable.next(this.EXAMPLE_DATA);
  }
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
        case 'done':  return this.compare(a.done, b.done, isAsc);
        default: return 0;
      }
    });
  }

  private getPagedData(data: TodoItem[], startIndex, pageSize) {
    return data.splice(startIndex, pageSize);
  }

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  private compare(a: string | number | boolean, b: string | number | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getFullTodoList(): Observable<TodoItem[]>{
    return this.dataObservable.asObservable();
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

  addTodo(element: TodoItem){
    const newId = this.EXAMPLE_DATA.reduce((acc, item) => acc < item.id ? item.id : acc, 0);
    this.EXAMPLE_DATA.push({
      ...element,
      id: newId + 1
    });
    console.log(this.EXAMPLE_DATA);
    this.updateStorage();
  }

  deleteTodo(id: number){
    const elementIdx = this.EXAMPLE_DATA.findIndex(element => element.id === id);
    if(elementIdx >= 0){
      this.EXAMPLE_DATA.splice(elementIdx, 1);
      this.updateStorage();
    }
  }
  updateTodo(element){
    const elementIdx = this.EXAMPLE_DATA.findIndex(elem => elem.id === element.id);
    if(elementIdx >= 0){
      this.EXAMPLE_DATA[elementIdx] = {
        ...this.EXAMPLE_DATA[elementIdx],
        ...element
      }
      this.updateStorage();
    }
  }
  getTotalLength(){
    return this.EXAMPLE_DATA.length;
  }
}
