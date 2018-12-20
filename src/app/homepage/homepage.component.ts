import { Component, OnInit } from '@angular/core';

import { FlightInspirationService } from '../flight-inspiration/flight-inspiration.service';
import { FlightService } from '../shared/flight.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  city: string = ''
  inspirations: any[] = [];
  originLocation: any[] = [];
  inspirationToFocus: string = '';

  constructor(private flightInspirationService: FlightInspirationService, private flightService: FlightService) {
    this.flightInspirationService.getInspirations().subscribe(
      ({inspirations, currency}) => {
        inspirations.forEach(inspiration => {
          if(inspiration.locationInfo && inspiration.locationInfo.city) {
            const { destination, origin, departureDate, returnDate, originLocation } = inspiration;
            let results = inspiration.locationInfo.city.results;
            let cityName;
            let countryName;
            for(let i = 0; i < results.length; i++) {
              if(!cityName) {
                cityName = results[i].address_components.find( component => component.types.includes('locality') ) ||
                           results[i].address_components.find( component => component.types.includes('political') );
              }
              if(!countryName) {
                countryName = results[i].address_components.find( component => component.types.includes('country') );
              }
              if(cityName && countryName) {
                cityName = cityName.long_name;
                countryName = countryName.long_name;
                break;
              }
            }
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
                latitude: inspiration.locationInfo.airport.lat,
                longitude: inspiration.locationInfo.airport.lon,
                name: inspiration.locationInfo.airport.name
              }
            });
            if(!cityName) {
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
    });
  }

  ngOnInit() {
  }

  formsInitialized() {
    try {
      const searchCriteria = JSON.parse(localStorage.getItem('searchCriteria'));
      if(searchCriteria) {
        this.flightService.gotCriteria.emit(searchCriteria);
      } else {
        throw new Error('searchCriteria is empty');
      }
    } catch(err) {
      console.log('Error in loading search criteria from local storage', err);
    }
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  scroll(inspirationToFocus?: string) {
    window.scrollTo({top: window.innerHeight + 40, left: 0, behavior: 'smooth'})
    if(inspirationToFocus) {
      this.inspirationToFocus = inspirationToFocus;
    }
  }
}
