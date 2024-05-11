import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'courses-ecomm';

  constructor() { }

  ngOnInit(): void { }

}
