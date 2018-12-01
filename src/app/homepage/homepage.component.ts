import { Component, OnInit } from '@angular/core';

import { FlightInspirationService } from '../flightInspiration.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  city: string = ''
  inspirations: any[] = [];
  originLocation: any[] = [];

  constructor(private flightInspirationService: FlightInspirationService) {
    this.flightInspirationService.getInspirations().subscribe(
      (inspirations) => {
        inspirations.forEach(inspiration => {
          if(inspiration.location_info) {
            const { destination, origin, departure_date, return_date, originLocation } = inspiration;
            const { country, currency, name: cityName, location } = inspiration.location_info.city;
            this.originLocation = originLocation;
            this.inspirations.push({
              photoRef: undefined,
              city: cityName,
              country,
              price: inspiration.price,
              currency,
              destination,
              origin,
              departure_date,
              return_date,
              location
            });
            if(!cityName || true) {
              return;
            }
            this.flightInspirationService.placeSearch(cityName).subscribe(
              (photo) => {
                if(photo.photo_reference) {
                  this.inspirations.map(inspiration => {
                    if (inspiration.city && inspiration.city === cityName && photo.photo_reference) {
                      inspiration.photoRef = photo.photo_reference;
                    }
                    return inspiration
                  })
                }
              }
            )
          }
        }
      )
      console.log(JSON.stringify(this.inspirations.splice(0,6), null, 2));
    });
  }

  ngOnInit() {

  }

}
