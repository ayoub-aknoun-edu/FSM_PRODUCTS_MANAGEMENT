import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnotherProductConfDialogueComponent } from './add-another-product-conf-dialogue.component';

describe('AddAnotherProductConfDialogueComponent', () => {
  let component: AddAnotherProductConfDialogueComponent;
  let fixture: ComponentFixture<AddAnotherProductConfDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnotherProductConfDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnotherProductConfDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
