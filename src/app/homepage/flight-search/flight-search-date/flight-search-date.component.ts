import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flight-search-date',
  templateUrl: './flight-search-date.component.html',
  styleUrls: ['./flight-search-date.component.scss']
})
export class FlightSearchDateComponent implements OnInit {
  date: string = '';

  @Input() direction: string;

  @Output() dateUpdated = new EventEmitter<{date: string, direction: string}>();

  constructor() { }

  ngOnInit() {
  }

  onUpdateDate(event: Event) {
    this.date = (<HTMLInputElement>event.target).value;
    this.dateUpdated.emit({
      date: this.date,
      direction: this.direction
    });
  }

}
