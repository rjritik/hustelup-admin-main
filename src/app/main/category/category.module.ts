import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategorySidebarComponent } from './category-list/category-sidebar/category-sidebar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CategoryEditComponent } from './category-edit/category-edit.component';
const routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: 'category-edit/:id',
    component: CategoryEditComponent
  }
]
@NgModule({
  declarations: [
    CategoryListComponent,
    CategorySidebarComponent,
    CategoryEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreSidebarModule, FormsModule,
    NgxDatatableModule,
    NgbModule, NgSelectModule, Ng2FlatpickrModule,
    CorePipesModule, CoreDirectivesModule,
    CoreCommonModule
  ]
})
export class CategoryModule { }
