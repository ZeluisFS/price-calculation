import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { CalculationRoutingModule } from './calculation-routing.module';
import { CalculationComponent } from './pages/calculation/calculation.component';
import { CalculationFormComponent } from './components/calculation-form/calculation-form.component';


@NgModule({
  declarations: [
    CalculationComponent,
    CalculationFormComponent
  ],
  imports: [
    CommonModule,
    CalculationRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class CalculationModule { }
