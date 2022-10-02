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
import { PostImageReportListComponent } from './post-image-report-list/post-image-report-list.component';
import { ViewpostimageReportComponent } from './post-image-report-list/viewpostimage-report/viewpostimage-report.component';
const routes = [{
  path: '',
  component: PostImageReportListComponent
},
{
  path: 'view-PostImageReport/:id',
  component: ViewpostimageReportComponent
}
]

@NgModule({
  declarations: [
    PostImageReportListComponent,
    ViewpostimageReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule, NgbModule,
    NgxDatatableModule, CoreCommonModule,
    CoreDirectivesModule, CorePipesModule,
    CoreSidebarModule, NgSelectModule, Ng2FlatpickrModule,
    RouterModule.forChild(routes),
  ]
})
export class PostImageReportModule { }
