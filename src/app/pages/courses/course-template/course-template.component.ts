import { Component, Input } from '@angular/core';
import { Courses } from '../../../interfaces/courses';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-template',
  templateUrl: './course-template.component.html',
  styleUrl: './course-template.component.css',
})
export class CourseTemplateComponent {
  @Input() course!: Courses;
  constructor(private courseService: CoursesService) { }
}
