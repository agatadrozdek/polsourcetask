import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TodoformComponent } from './todoform/todoform.component';



const routes: Routes = [
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'todoform',
    component: TodoformComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



