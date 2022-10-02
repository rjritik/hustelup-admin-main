import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MenuSubCategoryListComponent } from './menu-sub-category-list/menu-sub-category-list.component';
import { MenuSubCategorySidebarComponent } from './menu-sub-category-list/menu-sub-category-sidebar/menu-sub-category-sidebar.component'

const routes = [
  {
    path: '',
    component: MenuSubCategoryListComponent
  }
]
@NgModule({
  declarations: [
    MenuSubCategoryListComponent,
    MenuSubCategorySidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreSidebarModule,
    FormsModule, NgxDatatableModule,
    CoreCommonModule, CoreDirectivesModule,
    NgbModule, NgSelectModule, Ng2FlatpickrModule,
    CorePipesModule
  ]
})
export class MenuSubCategoryModule { }
