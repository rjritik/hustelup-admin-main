import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfluencerComponent } from './view-influencer.component';

describe('ViewInfluencerComponent', () => {
  let component: ViewInfluencerComponent;
  let fixture: ComponentFixture<ViewInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInfluencerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
