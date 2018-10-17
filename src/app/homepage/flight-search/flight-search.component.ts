import { Component, OnInit } from '@angular/core';

import { FlightService } from '../../flight.service';

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

  constructor(private flightService: FlightService) { }

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
    this.flightService.lowFareSearch(this.origin, this.destination)
      .subscribe(
        (flights: any[]) => {
          console.log(flights)
        }
      )
  }

}
