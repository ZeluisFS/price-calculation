import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CountryApiService } from 'src/app/services/country-api.service';

import { CalculationComponent } from './calculation.component';

describe('CalculationComponent', () => {
  let component: CalculationComponent;
  let fixture: ComponentFixture<CalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationComponent ],
      providers: [
        {provide: CountryApiService, useValue: {getCountryList: () => of([])}}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
