import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculationRoutingModule } from './calculation-routing.module';
import { CalculationComponent } from './pages/calculation/calculation.component';


@NgModule({
  declarations: [
    CalculationComponent
  ],
  imports: [
    CommonModule,
    CalculationRoutingModule
  ]
})
export class CalculationModule { }
