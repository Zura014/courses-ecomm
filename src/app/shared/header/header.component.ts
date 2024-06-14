import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  bm: boolean = false;
  authService: AuthService = inject(AuthService)

  ngOnInit(): void {
    
  }

  logOut(): void {
    this.authService.logOut();
  }

}
