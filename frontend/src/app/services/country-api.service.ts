import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryWithVatRates } from '../calculation/models';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {
  private readonly apiBaseUrl = environment.baseApi

  constructor(private readonly http: HttpClient) { }

  getCountryList(): Observable<CountryWithVatRates[]> {
    return this.http.get<CountryWithVatRates[]>(this.apiBaseUrl + 'country/list')
  }
}
