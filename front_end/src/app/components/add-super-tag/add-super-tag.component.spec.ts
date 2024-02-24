import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuperTagComponent } from './add-super-tag.component';

describe('AddSuperTagComponent', () => {
  let component: AddSuperTagComponent;
  let fixture: ComponentFixture<AddSuperTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuperTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSuperTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
