import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { HomepageComponent } from './homepage.component';

@Component({selector: 'app-flight-search', template: ''})
class FlightSearchStubComponent { }

@Component({selector: 'app-flight-inspiration', template: ''})
class FlightInspirationStubComponent { }

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomepageComponent,
        FlightSearchStubComponent,
        FlightInspirationStubComponent
     ],
     imports: [ HttpClientModule ],
     schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
