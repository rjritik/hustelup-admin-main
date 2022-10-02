import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { PostVideoReportListComponent } from './post-video-report-list/post-video-report-list.component';
import { ViewPostVideoReportComponent } from './view-post-video-report/view-post-video-report.component';
const routes=[{
  path:'',
  component: PostVideoReportListComponent
},
{
  path: 'view-PostVideoReport/:id',
  component: ViewPostVideoReportComponent
}
]
@NgModule({
  declarations: [
    PostVideoReportListComponent,
    ViewPostVideoReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule, NgbModule,
    NgxDatatableModule, CoreCommonModule,
    CoreDirectivesModule, CorePipesModule,
    CoreSidebarModule, NgSelectModule, Ng2FlatpickrModule,
    RouterModule.forChild(routes)
  ]
})
export class PostVideoReportModule { }
