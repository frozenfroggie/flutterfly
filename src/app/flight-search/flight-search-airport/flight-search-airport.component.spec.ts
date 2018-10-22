import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchAirportComponent } from './flight-search-airport.component';

describe('FlightSearchAirportComponent', () => {
  let component: FlightSearchAirportComponent;
  let fixture: ComponentFixture<FlightSearchAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchAirportComponent ]
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
