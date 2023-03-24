import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ONLY_NUMERIC_REGEX } from 'src/app/utils';
import { CountryWithVatRates } from '../../models';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent {
  private minimumPriceOrValueValidation: number = 1;
  private priceOrValueValidators = [Validators.required, Validators.pattern(ONLY_NUMERIC_REGEX),
    Validators.min(this.minimumPriceOrValueValidation)];

  formGroup = this.fb.group({
    country: ['', [Validators.required]],
    vatRate: ['', [Validators.required]],
    priceOptions: ['', [Validators.required]],
    priceWithoutVat: ['', this.priceOrValueValidators],
    valueAddedTax: ['', this.priceOrValueValidators],
    priceIncludeVat: ['', this.priceOrValueValidators]
  });

  countries: CountryWithVatRates[] = [
    {code: 'AT', value: 'Austria', vatRates: [5, 10, 13, 20]},
    {code: 'GB', value: 'United Kingdom', vatRates: [5, 20]},
    {code: 'PT', value: 'Portugal', vatRates: [6, 13, 23]},
    {code: 'SG', value: 'Singapore', vatRates: [7]}
  ];

  priceOptions: string[] = ['Price without VAT', 'Value-Added Tax', 'Price incl. VAT'];

  constructor(private fb: FormBuilder) { }

  alreadySelectedCountry(): boolean {
    if (this.formGroup.get('country')?.value) {
      return true;
    }

    return false;
  }

  selectedCountryVatRates(): number[] {
    const selectedCountryCode = this.formGroup.get('country')?.value;

    if (selectedCountryCode) {
      return this.countries?.find(c => c.code == selectedCountryCode)?.vatRates || [];
    }

    return [];
  }

  alreadySelectedVatRate(): boolean {
    if (this.formGroup.get('vatRate')?.value) {
      return true;
    }

    return false;
  }
}
