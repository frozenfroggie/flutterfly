import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  origin: {
    value: string,
    autocompleteSuggestions: {
      value: string,
      label: string
    }[],
    date: string
  } = {
    value: '',
    autocompleteSuggestions: [],
    date: ''
  }

  destination: {
    value: string,
    autocompleteSuggestions: {
      value: string,
      label: string
    }[],
    date: string
  } = {
    value: '',
    autocompleteSuggestions: [],
    date: ''
  }

  who: number = 1;
  cabinClass: string = 'economy';
  flightsResults = [];
  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit() {
  }

  airportUpdated({value, direction}: {value: string, direction: string}) {
    this[direction].value = value;
    if(value === '') {
      this[direction].autocompleteSuggestions = [];
      return;
    }
    this.flightService.airportAutocomplete(value)
      .subscribe(
        (locations: any[]) => {
          this[direction].autocompleteSuggestions = locations;
        }
      );
  }

  dateUpdated({date, direction}: {date: string, direction: string}) {
    this[direction].date = date;
  }

  suggestedLocationClicked({value, direction}: {value: string, direction: string}) {
    this[direction].autocompleteSuggestions = [];
    this[direction].value = value;
  }

  flightSearch() {
    this.router.navigate(['flights']);
    this.flightService.lowFareSearch(this.origin, this.destination, this.who, this.cabinClass)
      .subscribe(
        (flights) => {
          this.flightService.gotFlights.emit(flights.results);
        }
      )
  }

}
