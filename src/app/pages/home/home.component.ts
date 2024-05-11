import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  counters = [
    { name: 'counter1', start:0, end: 200, duration: 1000, value: 0, iteration: 1, },
    { name: 'counter2', start: 0, end: 1200, duration: 2000, value: 0, iteration: 3, },
    { name: 'counter3', start:0, end: 2256, duration: 1500, value: 0, iteration: 6, },
    { name: 'counter4', start:0, end: 100, duration: 1750, value: 0, iteration: 1, }
  ];


  ngAfterViewInit(): void {
    for (let i = 0; i < this.counters.length; i++) {
      this.animateCounter(i);
    }
  }

  animateCounter(el: any) {
    let duration = this.counters[el].duration;
    let range = this.counters[el].end - this.counters[el].start;
    let min = this.counters[el].start;
    let currentValue = min;
    let increment = this.counters[el].iteration;
    let obj = this.counters[el];
  
    let initialStepTime = Math.abs(Math.floor( duration / range));
    let stepTime = initialStepTime;
    let slowdownFactor = 1.05;   // Adjust this value to control the rate of slowdown
  
    let timer = setInterval(() => {
      currentValue += increment;
      obj.value = currentValue;
      if (currentValue == this.counters[el].end) {
        clearInterval(timer);
      }
      stepTime = stepTime / slowdownFactor; // Increase stepTime in each iteration
    }, stepTime);
  }

}
