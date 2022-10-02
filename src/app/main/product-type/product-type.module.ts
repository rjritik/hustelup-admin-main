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
import { ProductTypeListComponent } from './product-type-list/product-type-list.component';
import { ProductTypeSidebarComponent } from './product-type-list/product-type-sidebar/product-type-sidebar.component';
const routes = [
  {
    path: '',
    component: ProductTypeListComponent
  }
]
@NgModule({
  declarations: [
    ProductTypeListComponent,
    ProductTypeSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, CoreSidebarModule,
    NgxDatatableModule, CoreCommonModule,
    CoreDirectivesModule, CorePipesModule,
    NgbModule, NgSelectModule, Ng2FlatpickrModule,
  ]
})
export class ProductTypeModule { }

