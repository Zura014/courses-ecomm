import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BannerComponent } from './shared/banner/banner.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CounterComponent } from './shared/counter/counter.component';
import { CourseTemplateComponent } from './shared/course-template/course-template.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { NavigationStart, Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    CoursesComponent,
    LoginComponent,
    RegisterComponent,
    BannerComponent,
    ForgotPasswordComponent,
    CounterComponent,
    CourseTemplateComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,   
  ],
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.authService.setLastActiveTime();
      }
    });
  }
 }
