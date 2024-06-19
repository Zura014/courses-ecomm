import { Component } from '@angular/core';
import { CounterComponent } from '../../shared/counter/counter.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isVisible = true; // Assume this is controlled elsewhere

  onVisibilityChange(isVisible: boolean) {
    if (isVisible) {
      console.log('Component is visible!');
      // Run your function here
    } else {
      console.log('Component is not visible');
    }
  }
}
