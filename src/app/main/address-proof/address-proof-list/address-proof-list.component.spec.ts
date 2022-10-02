import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressProofListComponent } from './address-proof-list.component';

describe('AddressProofListComponent', () => {
  let component: AddressProofListComponent;
  let fixture: ComponentFixture<AddressProofListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressProofListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressProofListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
