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
import { InfluencerListComponent } from './influencer-list/influencer-list.component';
import { ViewInfluencerComponent } from './influencer-list/view-influencer/view-influencer.component';
const routes = [
  {
    path: '',
    component: InfluencerListComponent
  },
  {
    path: 'view-influencer/:id',
    component: ViewInfluencerComponent
  }
]
@NgModule({
  declarations: [
    InfluencerListComponent,
    ViewInfluencerComponent
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
export class ManageInfluencerModule { }
