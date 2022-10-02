import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdminSidebarComponent } from './new-admin-sidebar.component';

describe('NewAdminSidebarComponent', () => {
  let component: NewAdminSidebarComponent;
  let fixture: ComponentFixture<NewAdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdminSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
