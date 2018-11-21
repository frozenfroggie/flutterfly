import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-search-date',
  templateUrl: './flight-search-date.component.html',
  styleUrls: ['./flight-search-date.component.scss']
})
export class FlightSearchDateComponent implements OnInit {

  @Input() display: string;

  origin: {
    date: string
  } = {
    date: ''
  }

  destination: {
    date: string
  } = {
    date: ''
  }

  @Input() direction: string;

  @Output() formReady = new EventEmitter<FormGroup>()
  dateForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.dateForm = new FormGroup({
      'origin': new FormControl(null, Validators.required),
      'destination': new FormControl(null, Validators.required)
    });
     // Emit the form group to the father to do whatever it wishes
     this.formReady.emit(this.dateForm);
  }

  onUpdateDate(direction: string, event: Event) {
    this[direction].date = (<HTMLInputElement>event.target).value;
  }

  getCurrentDate() {
    return new Date().toJSON().split('T')[0];
  }

}
