import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryVoucherComponent } from './add-entry-voucher.component';

describe('AddEntryVoucherComponent', () => {
  let component: AddEntryVoucherComponent;
  let fixture: ComponentFixture<AddEntryVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntryVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntryVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
