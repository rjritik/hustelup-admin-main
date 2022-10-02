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
import { StoreListComponent } from './store-list/store-list.component';
import { ViewStoreComponent } from './store-list/view-store/view-store.component';
const routes = [
  {
    path: '',
    component: StoreListComponent
  },
  {
    path: 'view-store/:id',
    component: ViewStoreComponent
  }
]
@NgModule({
  declarations: [
    StoreListComponent,
    ViewStoreComponent
  ],
  imports: [
    CommonModule, NgxDatatableModule,
    CoreCommonModule, NgbModule,
    FormsModule, CoreDirectivesModule,
    CoreSidebarModule, NgSelectModule,
    Ng2FlatpickrModule,
    RouterModule.forChild(routes)
  ]
})
export class StoreModule { }
