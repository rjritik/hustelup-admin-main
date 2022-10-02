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
import { ColorsListComponent } from './colors-list/colors-list.component';
import { ColorSidebarComponent } from './colors-list/color-sidebar/color-sidebar.component';
import { ColorPickerModule } from 'ngx-color-picker';

const routes = [
  {
    path: '',
    component: ColorsListComponent
  }
]

@NgModule({
  declarations: [
    ColorsListComponent,
    ColorSidebarComponent
  ],
  imports: [
    CommonModule, NgxDatatableModule,
    CoreCommonModule, NgbModule,
    FormsModule, CoreDirectivesModule,
    CoreSidebarModule, NgSelectModule,
    Ng2FlatpickrModule, CorePipesModule,
    ColorPickerModule,
    RouterModule.forChild(routes)
  ]
})
export class ColorsModule { }
