import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from '../shared/auth.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { FlightService } from '../shared/flight.service';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    FlightService,
    AuthService
  ]
})
export class CoreModule {}
