import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FlightInspirationComponent } from './flight-inspiration/flight-inspiration.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSearchAirportComponent } from './flight-search/flight-search-airport/flight-search-airport.component';
import { FlightSearchDateComponent } from './flight-search/flight-search-date/flight-search-date.component';
import { FlightSearchResultsComponent } from './flight-search-results/flight-search-results.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'flights', component: FlightSearchResultsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomepageComponent,
    FlightInspirationComponent,
    FlightSearchComponent,
    FlightSearchAirportComponent,
    FlightSearchDateComponent,
    FlightSearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
