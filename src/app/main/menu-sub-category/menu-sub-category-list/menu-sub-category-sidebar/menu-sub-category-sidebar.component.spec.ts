import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSubCategorySidebarComponent } from './menu-sub-category-sidebar.component';

describe('MenuSubCategorySidebarComponent', () => {
  let component: MenuSubCategorySidebarComponent;
  let fixture: ComponentFixture<MenuSubCategorySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSubCategorySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSubCategorySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
