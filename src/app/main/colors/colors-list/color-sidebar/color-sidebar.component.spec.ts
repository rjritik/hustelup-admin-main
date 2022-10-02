import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSidebarComponent } from './color-sidebar.component';

describe('ColorSidebarComponent', () => {
  let component: ColorSidebarComponent;
  let fixture: ComponentFixture<ColorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
