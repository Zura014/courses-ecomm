import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    title: 'Edumel - Online Courses Website',
  },
  { path: 'home', component: HomeComponent, title: 'Edumel - Home Page' },
  { path: 'about', component: AboutComponent, title: 'Edumel - About Page' },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
    title: 'Edumel - Courses Page',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
    title: 'Edumel - Authorization Page',
  },
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
