import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { FlightInspirationComponent } from './flight-inspiration.component';

describe('FlightInspirationComponent', () => {
  let component: FlightInspirationComponent;
  let fixture: ComponentFixture<FlightInspirationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightInspirationComponent ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInspirationComponent);
    component = fixture.componentInstance;
  });

  const inspirations = [
    {
      "city": "Milan",
      "country": "IT",
      "price": "59.64",
      "currency": "EUR",
      "destination": "MIL",
      "origin": "PAR",
      "departure_date": "2019-01-15",
      "return_date": "2019-01-19",
      "location": {
        "latitude": 45.46427,
        "longitude": 9.18951
      }
    },
    {
      "city": "Porto",
      "country": "PT",
      "price": "64.36",
      "currency": "EUR",
      "destination": "OPO",
      "origin": "PAR",
      "departure_date": "2018-12-03",
      "return_date": "2018-12-06",
      "location": {
        "latitude": 41.14961,
        "longitude": -8.61099
      }
    },
    {
      "city": "Prague",
      "country": "CZ",
      "price": "77.91",
      "currency": "CZK",
      "destination": "PRG",
      "origin": "PAR",
      "departure_date": "2019-01-06",
      "return_date": "2019-01-10",
      "location": {
        "latitude": 50.08804,
        "longitude": 14.42076
      }
    },
    {
      "city": "Berlin",
      "country": "DE",
      "price": "89.33",
      "currency": "EUR",
      "destination": "BER",
      "origin": "PAR",
      "departure_date": "2019-01-12",
      "return_date": "2019-01-17",
      "location": {
        "latitude": 52.52437,
        "longitude": 13.41053
      }
    },
    {
      "city": "Stockholm",
      "country": "SE",
      "price": "93.62",
      "currency": "SEK",
      "destination": "STO",
      "origin": "PAR",
      "departure_date": "2019-01-30",
      "return_date": "2019-02-04",
      "location": {
        "latitude": 59.33,
        "longitude": 18.08
      }
    },
    {
      "city": "Madrid",
      "country": "ES",
      "price": "99.28",
      "currency": "EUR",
      "destination": "MAD",
      "origin": "PAR",
      "departure_date": "2019-01-09",
      "return_date": "2019-01-12",
      "location": {
        "latitude": 40.4165,
        "longitude": -3.70256
      }
    }
  ];

  it('should display inspiration city name', () => {
    component.inspirations = inspirations;
    fixture.detectChanges();
    let overlayCountry = fixture.debugElement.queryAll(By.css('.overlay-country'))[0];
    let overlayCountryEl = overlayCountry.nativeElement;
    expect(overlayCountryEl.textContent).toContain(inspirations[0].city);
  });

  it('should contain 6 flight inspirations', () => {
    component.inspirations = inspirations;
    fixture.detectChanges();
    expect(component.inspirations.length).toBe(6);
  });

});
