import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country/country.component';
import { CountryService } from './country/country.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import {AuthGuard} from "../../auth/helpers";
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

// routing
const routes: Routes = [
  {
    path: '',
    component: CountryComponent,
    canActivate: [AuthGuard],
    resolve: {
      uls: CountryService
    },
    data: { animation: 'CountryComponent' }
  }
  ];

@NgModule({
  declarations: [
    CountryComponent
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
    MatSelectCountryModule.forRoot('en'),
  ],
  providers: [CountryService]
})
export class CountryModule { }
