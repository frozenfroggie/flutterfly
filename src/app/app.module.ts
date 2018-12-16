import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePl, 'pl');

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FlightInspirationComponent } from './flight-inspiration/flight-inspiration.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSearchAirportComponent } from './flight-search/flight-search-airport/flight-search-airport.component';
import { FlightSearchDateComponent } from './flight-search/flight-search-date/flight-search-date.component';
import { FlightSearchResultsComponent } from './flight-search-results/flight-search-results.component';
import { CoreModule } from './core/core.module';
import { UtcDatePipe } from './utcDate.pipe';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'flights', component: FlightSearchResultsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FlightInspirationComponent,
    FlightSearchComponent,
    FlightSearchAirportComponent,
    FlightSearchDateComponent,
    FlightSearchResultsComponent,
    UtcDatePipe
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pl' } ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
     apiKey: environment.GOOGLE_API_KEY
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
