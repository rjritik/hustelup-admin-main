import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ProductViewComponent } from './product-list/product-view/product-view.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'ProductView/:id',
    component: ProductViewComponent
  }
]
@NgModule({
  declarations: [
    ProductListComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    CoreCommonModule,
    CoreSidebarModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    CoreDirectivesModule,
    CorePipesModule,
    CarouselModule
  ]
})

export class ProductModule { }
