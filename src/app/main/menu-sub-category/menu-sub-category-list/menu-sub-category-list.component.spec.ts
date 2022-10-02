import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSubCategoryListComponent } from './menu-sub-category-list.component';

describe('MenuSubCategoryListComponent', () => {
  let component: MenuSubCategoryListComponent;
  let fixture: ComponentFixture<MenuSubCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSubCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSubCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
