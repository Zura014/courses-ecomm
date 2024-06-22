import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-course-template',
  templateUrl: './course-template.component.html',
  styleUrl: './course-template.component.css',
  standalone: true,
  imports: [RouterOutlet]
})
export class CourseTemplateComponent {}
