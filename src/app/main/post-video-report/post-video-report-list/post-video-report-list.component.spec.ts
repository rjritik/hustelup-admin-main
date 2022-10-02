import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVideoReportListComponent } from './post-video-report-list.component';

describe('PostVideoReportListComponent', () => {
  let component: PostVideoReportListComponent;
  let fixture: ComponentFixture<PostVideoReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostVideoReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVideoReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
