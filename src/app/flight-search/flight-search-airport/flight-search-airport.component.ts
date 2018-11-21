import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from '../../flight.service';

@Component({
  selector: 'app-flight-search-airport',
  templateUrl: './flight-search-airport.component.html',
  styleUrls: ['./flight-search-airport.component.scss']
})
export class FlightSearchAirportComponent implements OnInit {

  @Input() display: string;

  origin: {
    iataCode: string,
    value: string,
    autocompleteSuggestions: {
      value: string,
      label: string
    }[]
  } = {
    iataCode: '',
    value: '',
    autocompleteSuggestions: []
  }

  destination: {
    iataCode: string,
    value: string,
    autocompleteSuggestions: {
      value: string,
      label: string
    }[]
  } = {
    iataCode: '',
    value: '',
    autocompleteSuggestions: []
  }

  airportForm: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>()

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.airportForm = new FormGroup({
      'origin': new FormControl(null, Validators.required),
      'destination': new FormControl(null, Validators.required)
    });

     // Emit the form group to the father to do whatever it wishes
     this.formReady.emit(this.airportForm);
  }

  onUpdateAirport(direction: string, event: Event) {
    this[direction].iataCode = (<HTMLInputElement>event.target).value;
    this[direction].value = this[direction].iataCode;
    if(this[direction].iataCode === '') {
      this[direction].autocompleteSuggestions = [];
      return;
    }
    this.flightService.airportAutocomplete(this[direction].iataCode)
      .subscribe(
        (locations: any[]) => {
          this[direction].autocompleteSuggestions = locations;
        }
      );
  }

  onClickSuggestedLocation(direction: string, locationValue: string) {
    this[direction].iataCode = locationValue;
    this[direction].autocompleteSuggestions = [];
  }

}
