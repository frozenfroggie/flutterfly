import { ViewChild, ElementRef, Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from '../../shared/flight.service';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-flight-search-airport',
  templateUrl: './flight-search-airport.component.html',
  styleUrls: ['./flight-search-airport.component.scss']
})
export class FlightSearchAirportComponent implements OnInit {

  @Input() display: string;
  private inputOriginObservable: any;
  private inputDestinationObservable: any;

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

  @ViewChild('inputOrigin') inputOrigin: ElementRef;
  @ViewChild('inputDestination') inputDestination: ElementRef;

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

  ngAfterViewInit() {
    this.inputOriginObservable = fromEvent(this.inputOrigin.nativeElement, 'input')
      .pipe(
      map((event: Event) => event),
      debounceTime(200),
      distinctUntilChanged())
      .subscribe(event => {
        console.log(event);
        console.timeEnd("inputOrigin changed after."); // No matter how frequent you type, this will always be > 1000ms
        console.time("inputOrigin changed after."); // start track input change fire time
        this.onUpdateAirport('origin', event);
      });
    this.inputDestinationObservable = fromEvent(this.inputDestination.nativeElement, 'input')
      .pipe(
      map((event: Event) => event),
      debounceTime(200),
      distinctUntilChanged())
      .subscribe(event => {
        console.log(event);
        console.timeEnd("inputDestination changed after."); // No matter how frequent you type, this will always be > 1000ms
        console.time("inputDestination changed after."); // start track input change fire time
        this.onUpdateAirport('destination', event);
      });
  }

  onUpdateAirport(direction: string, event: Event) {
    this[direction].iataCode = (<HTMLInputElement>event.target).value;
    this[direction].value = this[direction].iataCode;
    if (this[direction].iataCode === '') {
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
