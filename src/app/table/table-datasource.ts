import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { flatMap, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { TodoService } from '../services/todo.service';

// TODO: Replace this with your own data model type

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TodoItem> {
  data: Observable<TodoItem> //TodoItem[];// = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  private todoService: TodoService;

  constructor(todoService: TodoService) {
    super();
    this.todoService = todoService;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TodoItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      //this.data,//observableOf(this.data),
      //observableOf(null),
      this.todoService.getFullTodoList(),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(flatMap(() => {
      //return this.getPagedData(this.getSortedData([...this.data]));
      return this.getPagedData();
    }));
  }
/*
const dataObservable = new Subject<TodoItem[]>();

    merge(...dataMutations).pipe(tap(() => {
      //return this.getPagedData(this.getSortedData([...this.data]));
      
    })).subscribe( () => {
      this.getPagedData().subscribe(data => {
        console.log(data);
        dataObservable.next(data)
      });
    });
    //this.paginator. = 1;
    return dataObservable.asObservable();
*/
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: TodoItem[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }
  private getPagedData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return this.todoService.getTodoList({
      startIndex: startIndex, 
      pageSize: this.paginator.pageSize,
      sortAttribute: this.sort.active,
      sortDirection: this.sort.direction
    });
  }

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: TodoItem[]) {
//     if (!this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort.direction === 'asc';
//       switch (this.sort.active) {
//         case 'taskName': return compare(a.taskName, b.taskName, isAsc);
//         // case 'id': return compare(+a.id, +b.id, isAsc);
//         case 'priority' : return compare(a.priority, b.priority, isAsc);
//         default: return 0;
//       }
//     });
//   }
}

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
