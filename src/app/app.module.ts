import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CoursesComponent } from './pages/courses/courses.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthService } from './pages/auth/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';
import { CoursesModule } from './pages/courses/courses.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    CoursesModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.authService.setLastActiveTime();
      }
    });
  }
}
