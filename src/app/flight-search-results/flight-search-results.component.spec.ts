import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'utcDate'})
class MockUtcDatePipe implements PipeTransform {
    transform(value: number): number {
        return value;
    }
}

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
        FlightSearchStubComponent,
        MockUtcDatePipe
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
