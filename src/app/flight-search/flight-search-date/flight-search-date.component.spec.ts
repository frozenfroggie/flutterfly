import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlightSearchDateComponent } from './flight-search-date.component';

describe('FlightSearchDateComponent', () => {
  let component: FlightSearchDateComponent;
  let fixture: ComponentFixture<FlightSearchDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSearchDateComponent ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
