import { Component } from '@angular/core';
import { CountryApiService } from 'src/app/services/country-api.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent {
  countries$ = this.countryApiService.getCountryList();

  constructor(private readonly countryApiService: CountryApiService) {}
}
