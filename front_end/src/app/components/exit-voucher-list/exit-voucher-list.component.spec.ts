import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitVoucherListComponent } from './exit-voucher-list.component';

describe('ExitVoucherListComponent', () => {
  let component: ExitVoucherListComponent;
  let fixture: ComponentFixture<ExitVoucherListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitVoucherListComponent]
    });
    fixture = TestBed.createComponent(ExitVoucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
