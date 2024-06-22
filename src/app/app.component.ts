import {
  Component,
  HostListener,
  inject,
  NgModule,
  OnInit,
} from '@angular/core';
import { AuthService } from './pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'courses-ecomm';
  authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.authService.autoLogOut();
  }
  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.authService.setLastActiveTime();
  }
}
