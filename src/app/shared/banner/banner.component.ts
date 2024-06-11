import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  banner: string = '../../../assets/page-title.jpg';
  @Input() title: string = '';
  @Input() path: string = '';


}
