import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostVideoReportComponent } from './view-post-video-report.component';

describe('ViewPostVideoReportComponent', () => {
  let component: ViewPostVideoReportComponent;
  let fixture: ComponentFixture<ViewPostVideoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostVideoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostVideoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
