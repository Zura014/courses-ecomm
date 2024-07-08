import { Component } from '@angular/core';
import { Courses } from '../../interfaces/courses';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  courses: any;
  constructor(private coursesService: CoursesService) { 
    this.coursesService.getCourses(1).subscribe((courses) => {
      this.courses = courses;
    });
  }
}
