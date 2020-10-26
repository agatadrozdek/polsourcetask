//import { MatPaginatorIntl } from '@angular/material';

import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

 @Injectable({
    providedIn: 'root'
  })
export class MatCustomPaginatorIntl extends MatPaginatorIntl {
    itemsPerPageLabel = 'Rows per page';
}