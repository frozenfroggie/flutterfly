import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FlightInspirationComponent } from './flight-inspiration/flight-inspiration.component';
import { FlightSearchComponent } from './homepage/flight-search/flight-search.component';
import { FlightSearchAirportComponent } from './homepage/flight-search/flight-search-airport/flight-search-airport.component';
import { FlightSearchDateComponent } from './homepage/flight-search/flight-search-date/flight-search-date.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomepageComponent,
    FlightInspirationComponent,
    FlightSearchComponent,
    FlightSearchAirportComponent,
    FlightSearchDateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
