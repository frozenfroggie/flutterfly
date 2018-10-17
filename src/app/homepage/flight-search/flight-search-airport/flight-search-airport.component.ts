import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-flight-search-airport',
  templateUrl: './flight-search-airport.component.html',
  styleUrls: ['./flight-search-airport.component.scss']
})
export class FlightSearchAirportComponent implements OnInit {
  iataCode: string = '';

  @Input() direction: string;
  @Input() autocompleteSuggestions: {value: string, label: string}[];

  @Output() airportUpdated = new EventEmitter<{value: string, direction: string}>();
  @Output() suggestedLocationClicked = new EventEmitter<{value: string, direction: string}>();

  ngOnInit() {
  }

  onUpdateAirport(event: Event) {
    this.iataCode = (<HTMLInputElement>event.target).value;
    this.airportUpdated.emit({
      value: this.iataCode,
      direction: this.direction
    });
  }

  onClickSuggestedLocation(locationValue: string) {
    this.iataCode = locationValue;
    this.suggestedLocationClicked.emit({
      value: this.iataCode,
      direction: this.direction
    });
  }

}
