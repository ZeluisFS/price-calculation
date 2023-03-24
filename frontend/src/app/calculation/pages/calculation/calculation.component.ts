import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ONLY_NUMERIC_REGEX } from 'src/app/utils';
import { CountryWithVatRates, PriceCodes, PriceOptions } from '../../models';

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
    priceWithoutVat: [{value: '', disabled: true}, this.priceOrValueValidators],
    valueAddedTax: [{value: '', disabled: true}, this.priceOrValueValidators],
    priceIncludeVat: [{value: '', disabled: true}, this.priceOrValueValidators]
  });

  countries: CountryWithVatRates[] = [
    {code: 'AT', value: 'Austria', vatRates: [5, 10, 13, 20]},
    {code: 'GB', value: 'United Kingdom', vatRates: [5, 20]},
    {code: 'PT', value: 'Portugal', vatRates: [6, 13, 23]},
    {code: 'SG', value: 'Singapore', vatRates: [7]}
  ];

  priceOptions: PriceOptions[] = [
    {code: PriceCodes.PriceWithoutVat, value: 'Price without VAT'},
    {code: PriceCodes.ValueAddedTax, value: 'Value-Added Tax'},
    {code: PriceCodes.PriceIncludeVat, value: 'Price incl. VAT'}
  ];

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

  onPriceOptionChange(event: MatRadioChange): void {
    const newPriceOptionCode = event.value;

    this.enableFormControl(newPriceOptionCode);
    this.disableOtherPriceOptions(newPriceOptionCode);
  }

  onPriceChange(event: Event, formControlName: string): void {
    if (this.formGroup.get(formControlName)?.valid) {
      const newValue = Number((event.target as HTMLInputElement).value);

      if (newValue) {
        const selectedVat = this.formGroup.get('vatRate')?.value;

        switch (formControlName) {
          case PriceCodes.PriceWithoutVat: {
            const priceWithoutVat = newValue;
            const valueAddedTax = this.roundTwoDecimalCases((selectedVat / 100) * priceWithoutVat);
            const priceIncludeVat = this.roundTwoDecimalCases(priceWithoutVat + valueAddedTax);

            this.formGroup.get(PriceCodes.ValueAddedTax)?.setValue(valueAddedTax);
            this.formGroup.get(PriceCodes.PriceIncludeVat)?.setValue(priceIncludeVat);
            break;
          }
          case PriceCodes.ValueAddedTax: {
            const valueAddedTax = newValue;
            const priceWithoutVat = this.roundTwoDecimalCases((valueAddedTax * 100) / selectedVat);
            const priceIncludeVat = this.roundTwoDecimalCases(priceWithoutVat + valueAddedTax);

            this.formGroup.get(PriceCodes.PriceWithoutVat)?.setValue(priceWithoutVat);
            this.formGroup.get(PriceCodes.PriceIncludeVat)?.setValue(priceIncludeVat);
            break;
          }
          case PriceCodes.PriceIncludeVat: {
            const priceIncludeVat = newValue;
            const priceWithoutVat = this.roundTwoDecimalCases(priceIncludeVat / ((selectedVat / 100) + 1));
            const valueAddedTax = this.roundTwoDecimalCases(priceIncludeVat - priceWithoutVat);

            this.formGroup.get(PriceCodes.PriceWithoutVat)?.setValue(priceWithoutVat);
            this.formGroup.get(PriceCodes.ValueAddedTax)?.setValue(valueAddedTax);
            break;
          }
        }
      }
    }
  }

  private disableFormControl(controlName: string): void {
    this.formGroup.get(controlName)?.disable();
  }

  private enableFormControl(controlName: string): void {
    this.formGroup.get(controlName)?.enable();
  }

  private disableOtherPriceOptions(priceCode: string): void {
    for (let option of this.priceOptions) {
      if (option.code != priceCode) {
        this.disableFormControl(option.code);
      }
    }
  }

  private roundTwoDecimalCases(number: number): number {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
}
