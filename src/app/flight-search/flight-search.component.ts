import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  @Input() display: string;

  who: number = 1;
  cabinClass: string = 'ECONOMY';
  flightsResults = [];

  flightSearchForm: FormGroup;

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit() {
    this.flightSearchForm = new FormGroup({
      'who': new FormControl(null, Validators.required),
      'cabinClass': new FormControl(null, Validators.required)
    });
    this.flightService.gotCriteria.subscribe(
      (searchCriteria) => {
        this.flightSearchForm.setValue(searchCriteria);
      }
    );

  }

  formInitialized(name: string, form: FormGroup) {
    this.flightSearchForm.setControl(name, form);
  }

  onSubmit() {
    const { value, status } = this.flightSearchForm;
    if(status === 'VALID') {
      this.flightSearch(value);
    }
  }

  flightSearch({who, cabinClass, airport, date}: {who: number, cabinClass: string, airport: {origin: string, destination: string}, date: {origin: string, destination: string}}) {
    this.router.navigate(['flights']);
    this.flightService.lowFareSearch(airport, date, who, cabinClass)
      .subscribe(
        ({lowFareResponse, searchCriteria}) => {
          this.flightService.gotCriteria.emit(searchCriteria);
          this.flightService.gotFlights.emit(lowFareResponse);
        },
        (err) => {
          if(err.error && err.error.msg) {
            this.flightService.gotError.emit(err.error.msg);
          }
        }
      )
  }

}
