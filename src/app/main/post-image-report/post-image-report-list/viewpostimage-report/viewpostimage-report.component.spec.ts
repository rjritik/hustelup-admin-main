import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostimageReportComponent } from './viewpostimage-report.component';

describe('ViewpostimageReportComponent', () => {
  let component: ViewpostimageReportComponent;
  let fixture: ComponentFixture<ViewpostimageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewpostimageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpostimageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
