import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressProofSidebarComponent } from './address-proof-sidebar.component';

describe('AddressProofSidebarComponent', () => {
  let component: AddressProofSidebarComponent;
  let fixture: ComponentFixture<AddressProofSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressProofSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressProofSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
