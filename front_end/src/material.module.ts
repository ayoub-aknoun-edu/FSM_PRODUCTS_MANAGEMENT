import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list'
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatStepperModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatGridListModule,
    MatMenuModule
  ]

})

export class MaterialModule { }
