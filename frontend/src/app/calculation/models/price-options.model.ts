export interface PriceOptions {
  code: string;
  value: string;
}

export enum  PriceCodes {
  PriceWithoutVat = 'priceWithoutVat',
  ValueAddedTax = 'valueAddedTax',
  PriceIncludeVat = 'priceIncludeVat'
}
