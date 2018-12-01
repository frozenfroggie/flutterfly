import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlightSearchResultsComponent } from './flight-search-results.component';

@Component({selector: 'app-flight-search', template: ''})
class FlightSearchStubComponent { }

describe('FlightSearchResultsComponent', () => {
  let component: FlightSearchResultsComponent;
  let fixture: ComponentFixture<FlightSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlightSearchResultsComponent,
        FlightSearchStubComponent
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
