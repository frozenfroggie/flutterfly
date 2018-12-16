import { Component, OnInit } from '@angular/core';

import { FlightInspirationService } from '../flight-inspiration/flight-inspiration.service';

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
        console.log(inspirations);
        inspirations.forEach(inspiration => {
          console.log(inspiration.location_info)
          if(inspiration.location_info && inspiration.location_info.city) {
            const { destination, origin, departureDate, returnDate, originLocation } = inspiration;
            let results = inspiration.location_info.city.results;
            let cityName;
            let countryName;
            for(let i = 0; i < results.length; i++) {
              if(!cityName) {
                cityName = results[i].address_components.find( component => component.types.includes('locality') ) ||
                           results[i].address_components.find( component => component.types.includes('political') );
              }
              if(!countryName) {
                countryName = results[i].address_components.find( component => component.types.includes('country') );
                console.log(countryName);
              }
              if(cityName && countryName) {
                cityName = cityName.long_name;
                countryName = countryName.long_name;
                break;
              }
            }
            console.log(cityName, countryName);
            const currency = 'EUR';
            this.originLocation = originLocation;
            this.inspirations.push({
              photoRef: undefined,
              city: cityName,
              country: countryName,
              price: inspiration.price.total,
              currency,
              destination,
              origin,
              departureDate,
              returnDate,
              location: {
                latitude: inspiration.location_info.airport.lat,
                longitude: inspiration.location_info.airport.lon
              }
            });
            if(!cityName) {
              return;
            }
            this.flightInspirationService.placeSearch(cityName).subscribe(
              (photo) => {
                console.log(photo)
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

  scroll() {
    window.scrollTo({top: window.innerHeight + 40, left: 0, behavior: 'smooth'})
  }
}
