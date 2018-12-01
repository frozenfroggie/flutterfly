import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlightSearchAirportComponent } from './flight-search-airport.component';

describe('FlightSearchAirportComponent', () => {
  let component: FlightSearchAirportComponent;
  let fixture: ComponentFixture<FlightSearchAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchAirportComponent ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
