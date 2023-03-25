import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryWithVatRates, PriceCodes } from '../../models';

import { CalculationFormComponent } from './calculation-form.component';

describe('CalculationFormComponent', () => {
  let component: CalculationFormComponent;
  let fixture: ComponentFixture<CalculationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationFormComponent ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check already selected country', () => {
    component.formGroup.get('country')?.setValue('');
    expect(component.alreadySelectedCountry()).toBeFalsy();

    component.formGroup.get('country')?.setValue('PT');
    expect(component.alreadySelectedCountry()).toBeTruthy();
  });

  it('should get selected country vat rates', () => {
    const countries: CountryWithVatRates[] = [
      {code: 'AT', value: 'Austria', vatRates: [5, 10, 13, 20]},
      {code: 'GB', value: 'United Kingdom', vatRates: [5, 20]},
      {code: 'PT', value: 'Portugal', vatRates: [6, 13, 23]},
      {code: 'SG', value: 'Singapore', vatRates: [7]}
    ];

    component.countries = countries;
    fixture.detectChanges();

    const ptCountryCode = 'PT';
    component.formGroup.get('country')?.setValue(ptCountryCode);
    expect(component.selectedCountryVatRates()).toEqual(countries.find(c => c.code == ptCountryCode)?.vatRates as number[]);

    const atCountryCode = 'AT';
    component.formGroup.get('country')?.setValue(atCountryCode);
    expect(component.selectedCountryVatRates()).toEqual(countries.find(c => c.code == atCountryCode)?.vatRates as number[]);
  });

  it('should check if already selected vat rate', () => {
    component.formGroup.get('vatRate')?.setValue(3);
    expect(component.alreadySelectedVatRate()).toBeTruthy();

    component.formGroup.get('vatRate')?.setValue('');
    expect(component.alreadySelectedVatRate()).toBeFalsy();
  });

  it('should enable / disable form constrols on price option change', () => {
    component.onPriceOptionChange({value: component.priceOptions[0].code} as MatRadioChange);
    expect(component.formGroup.get(component.priceOptions[0].code)?.enabled).toBeTruthy();
    expect(component.formGroup.get(component.priceOptions[1].code)?.enabled).toBeFalsy();
    expect(component.formGroup.get(component.priceOptions[2].code)?.enabled).toBeFalsy();

    component.onPriceOptionChange({value: component.priceOptions[1].code} as MatRadioChange);
    expect(component.formGroup.get(component.priceOptions[0].code)?.enabled).toBeFalsy();
    expect(component.formGroup.get(component.priceOptions[1].code)?.enabled).toBeTruthy();
    expect(component.formGroup.get(component.priceOptions[2].code)?.enabled).toBeFalsy();

    component.onPriceOptionChange({value: component.priceOptions[2].code} as MatRadioChange);
    expect(component.formGroup.get(component.priceOptions[0].code)?.enabled).toBeFalsy();
    expect(component.formGroup.get(component.priceOptions[1].code)?.enabled).toBeFalsy();
    expect(component.formGroup.get(component.priceOptions[2].code)?.enabled).toBeTruthy();
  });

  it('should calculate others prices on price change', () => {
    component.formGroup.setValue({
      country: 'AT',
      vatRate: '10',
      priceOptions: 'priceWithoutVat',
      priceWithoutVat: 1,
      valueAddedTax: 1,
      priceIncludeVat: 1
    });
    component.formGroup.get(PriceCodes.PriceWithoutVat)?.enable();
    component.formGroup.get(PriceCodes.ValueAddedTax)?.enable();
    component.formGroup.get(PriceCodes.PriceIncludeVat)?.enable();

    component.onPriceChange({target: {value: 100}} as any as Event, PriceCodes.PriceWithoutVat);
    expect(component.formGroup.get(PriceCodes.ValueAddedTax)?.value).toBe(10);
    expect(component.formGroup.get(PriceCodes.PriceIncludeVat)?.value).toBe(110);

    component.formGroup.patchValue({
      priceWithoutVat: 1,
      valueAddedTax: 1,
      priceIncludeVat: 1
    });

    component.onPriceChange({target: {value: 10}} as any as Event, PriceCodes.ValueAddedTax);
    expect(component.formGroup.get(PriceCodes.PriceWithoutVat)?.value).toBe(100);
    expect(component.formGroup.get(PriceCodes.PriceIncludeVat)?.value).toBe(110);

    component.formGroup.patchValue({
      priceWithoutVat: 1,
      valueAddedTax: 1,
      priceIncludeVat: 1
    });

    component.onPriceChange({target: {value: 110}} as any as Event, PriceCodes.PriceIncludeVat);
    expect(component.formGroup.get(PriceCodes.PriceWithoutVat)?.value).toBe(100);
    expect(component.formGroup.get(PriceCodes.ValueAddedTax)?.value).toBe(10);
  });

  it('whould display correct validation errors', () => {
    component.formGroup.setValue({
      country: 'AT',
      vatRate: '10',
      priceOptions: 'priceWithoutVat',
      priceWithoutVat: 1,
      valueAddedTax: 1,
      priceIncludeVat: 1
    });
    component.formGroup.get(PriceCodes.PriceWithoutVat)?.enable();

    component.formGroup.get(PriceCodes.PriceWithoutVat)?.setValue('');
    expect(component.controlHasError(PriceCodes.PriceWithoutVat)).toEqual('Field cannot be empty');

    component.formGroup.get(PriceCodes.PriceWithoutVat)?.setValue('23a');
    expect(component.controlHasError(PriceCodes.PriceWithoutVat)).toEqual('Field only numeric');

    component.formGroup.get(PriceCodes.PriceWithoutVat)?.setValue(0);
    expect(component.controlHasError(PriceCodes.PriceWithoutVat)).toEqual('Field must be positive');
  })
});
