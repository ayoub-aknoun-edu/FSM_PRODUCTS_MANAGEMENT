import { Component, OnInit } from '@angular/core';
import { EntryVoucher } from 'src/app/models/EntryVoucher';
import { EntryVoucherService } from 'src/app/services/entry-voucher.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-entry-voucher',
  templateUrl: './add-entry-voucher.component.html',
  styleUrls: ['./add-entry-voucher.component.css']
})
export class AddEntryVoucherComponent implements OnInit {

  private entryVouchers!: EntryVoucher[];
  entryVoucherForm!: FormGroup

  constructor(
    private entryVoucherService: EntryVoucherService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.loadEntryVouchers();
  }

  ngOnInit(): void {
    this.entryVoucherForm = this.fb.group({
      evNumber: [, [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: [""],
      date: [new Date()],
      invoice: this.fb.group({
        total_amount: [, [Validators.required, this.positiveNumberValidator]],
        date: [, Validators.required]
      })
    });
  }

  private positiveNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
      return { 'positiveNumber': { value } };
    }
    return null;
  }

  dueDateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date ? date >= currentDate : false;
  }


  get InvoiceFormGroup(): FormGroup {
    return this.entryVoucherForm?.get('invoice') as FormGroup
  }

  loadEntryVouchers() {
    this.entryVoucherService.getEntryVouchers().subscribe(
      res => {
        this.entryVouchers = res
      }
    )
  }

  evNumber: any;
  onSubmit(): void {
    if (this.entryVoucherForm.valid) {
      // Format the due_date using DatePipe
      const formattedDueDate = this.datePipe.transform(
        this.InvoiceFormGroup.get('date')?.value,
        'yyyy-MM-dd'
      );

      // Update the form value with the formatted date
      this.InvoiceFormGroup.get('date')?.setValue(formattedDueDate);

      // Format the date attribute using DatePipe
      const formattedDate = this.datePipe.transform(
        this.entryVoucherForm.get('date')?.value,
        'yyyy-MM-dd'
      );

      // Update the form value with the formatted date
      this.entryVoucherForm.get('date')?.setValue(formattedDate);

      // Rest of your onSubmit logic
      if (this.entryVoucherForm.valid) {
        const newForm: EntryVoucher = this.entryVoucherForm.value;
        this.entryVoucherService.addEntryVoucher(newForm).subscribe(
          (result) => {
            this.snackBar.open('Entry Voucher added successfully', 'Close', {
              duration: 3000,
            });
            //this.router.navigate(['/evs'])
            this.evNumber = this.entryVoucherForm.value.evNumber;
            this.router.navigate(['/add-product', this.evNumber]);
          },
          (error) => {
            this.snackBar.open('Error adding entry voucher', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    }
  }


}
