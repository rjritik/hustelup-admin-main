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
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandViewComponent } from './brand-list/brand-view/brand-view.component';
const routes = [
  {
    path: '',
    component: BrandListComponent
  },
  {
    path: 'brand-view/:id',
    component: BrandViewComponent
  }
]
@NgModule({
  declarations: [
    BrandListComponent,
    BrandViewComponent
  ],
  imports: [
    CommonModule, NgxDatatableModule,
    CoreCommonModule, NgbModule,
    FormsModule, CoreDirectivesModule,
    CoreSidebarModule, NgSelectModule,
    Ng2FlatpickrModule, CorePipesModule,
    RouterModule.forChild(routes)
  ]
})
export class BrandModule { }
