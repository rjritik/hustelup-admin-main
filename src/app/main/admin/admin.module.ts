import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admin-list/admin-list.component';
import { NewAdminSidebarComponent } from './admin-list/new-admin-sidebar/new-admin-sidebar.component';
import { AdminListService } from './admin-list/admin-list.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

// routing
const routes: Routes = [
  {
    path: '',
    component: AdminListComponent
  },
  {
    path: 'admin-edit/:id',
    component: AdminEditComponent
  }
];

@NgModule({
  declarations: [
    AdminListComponent,
    NewAdminSidebarComponent,
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  providers: [AdminListService]
})
export class AdminModule { }
