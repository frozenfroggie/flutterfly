import { Component, OnInit, Input } from '@angular/core';

import { FlightService } from '../../../flight.service';

@Component({
  selector: 'app-flight-search-airport',
  templateUrl: './flight-search-airport.component.html',
  styleUrls: ['./flight-search-airport.component.scss']
})
export class FlightSearchAirportComponent implements OnInit {
  airport: string = '';
  autocompleteLocations: {label: string, value: string}[] = [];

  @Input() placeholder: string;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
  }

  onUpdateAirport(event: Event) {
    this.airport = (<HTMLInputElement>event.target).value;
    if((<HTMLInputElement>event.target).value === '') {
      this.autocompleteLocations = [];
      return;
    }
    this.flightService.airportAutocomplete(this.airport)
      .subscribe(
        (locations: any[]) => {
          this.autocompleteLocations = locations;
        }
      );
  }

  onClickAutocompletedLocation(locationValue: string) {
    this.airport = locationValue;
    this.autocompleteLocations = [];
  }

}
