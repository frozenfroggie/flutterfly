import { Component, OnInit } from '@angular/core';

import { FlightInspirationService } from '../flightInspiration.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  city: string = '';
  lat: number;
  lon: number;
  inspirations: any[] = [];

  constructor(private flightInspirationService: FlightInspirationService) {
    this.flightInspirationService.getInspirations().subscribe(
      (inspirations) => {
        inspirations.forEach(inspiration => {
          if(inspiration.location_info) {
            const { country, currency, name: cityName } = inspiration.location_info.city;
            this.inspirations.push({
              photoRef: undefined,
              city: cityName,
              country,
              price: inspiration.price,
              currency
            });
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
    });
  }

  ngOnInit() {

  }

}
