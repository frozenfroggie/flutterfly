import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
  @Output() formsReady = new EventEmitter<any>(true);
  // passing 'true' option to make EventEmitter asynchronous and fix 'ExpressionChangedAfterItHasBeenCheckedError' error

  who: number = 1;
  cabinClass: string = 'ECONOMY';
  flightsResults = [];
  flightSearchForm: FormGroup;
  initializedForms: Array<string> = [];

  constructor(private flightService: FlightService, private router: Router) {

  }

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
    this.initializedForms.push(name);
    if(this.initializedForms.length === 2) {
      this.formsReady.emit();
    }
  }

  onSubmit() {
    const { value, status } = this.flightSearchForm;
    if (status === 'VALID') {
      this.flightService.gotFlights.emit(null);
      this.flightSearch(value);
    }
  }

  flightSearch({ who, cabinClass, airport, date }: { who: number, cabinClass: string, airport: { origin: string, destination: string }, date: { origin: string, destination: string } }) {
    setTimeout(() => { // make it asynchronous
      this.flightService.gotCriteria.emit({ who, cabinClass, airport, date });
      this.flightService.reqPending.emit(true);
    });
    this.router.navigate(['flights']);
    this.flightService.lowFareSearch(airport, date, who, cabinClass)
      .subscribe(
        ({ lowFareResponse, searchCriteria }) => {
          this.flightService.gotFlights.emit(lowFareResponse);
        },
        (err) => {
          if (err.status === 404) {
            this.flightService.gotError.emit('Flights not found for given dates. Change search criteria.');
          } else {
            this.flightService.gotError.emit('Something goes wrong. Please try again later.');
          }
        }
      )
  }

}
