import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImageReportListComponent } from './post-image-report-list.component';

describe('PostImageReportListComponent', () => {
  let component: PostImageReportListComponent;
  let fixture: ComponentFixture<PostImageReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostImageReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImageReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
