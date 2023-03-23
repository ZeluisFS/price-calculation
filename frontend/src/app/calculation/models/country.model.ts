export interface Country {
  code: string;
  value: string;
}

export interface CountryWithVatRates extends Country {
  vatRates: number[];
}
