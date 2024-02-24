import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEntryVoouchersComponent } from './display-entry-voouchers.component';

describe('DisplayEntryVoouchersComponent', () => {
  let component: DisplayEntryVoouchersComponent;
  let fixture: ComponentFixture<DisplayEntryVoouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayEntryVoouchersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEntryVoouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
