import { TestBed } from '@angular/core/testing';

import { PostVideoReportService } from './post-video-report.service';

describe('PostVideoReportService', () => {
  let service: PostVideoReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostVideoReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
