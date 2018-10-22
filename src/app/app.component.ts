import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flutterfly';
  flights: any[] = [];

  ngOnInit() {
    const flights = localStorage.getItem('flights');
    console.log('init!', JSON.parse(flights));
    this.flights = JSON.parse(flights);
  }

  gotFlights(results: any[]) {
    console.log('2', results);
    this.flights = results;
  }
}
