import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeSidebarComponent } from './product-type-sidebar.component';

describe('ProductTypeSidebarComponent', () => {
  let component: ProductTypeSidebarComponent;
  let fixture: ComponentFixture<ProductTypeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
