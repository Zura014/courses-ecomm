import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  bm: boolean = false;
  isLoggedIn!: boolean;
  authService: AuthService = inject(AuthService)

  ngOnInit(): void {
    this.authService.isLoggedIn()
    if(this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    console.log(this.isLoggedIn)
  }

  logOut(): void {
    this.authService.logOut();
    this.isLoggedIn = false;
    console.log(this.isLoggedIn)
  }

}
