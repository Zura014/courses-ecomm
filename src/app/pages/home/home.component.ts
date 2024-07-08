import { Component, OnInit } from '@angular/core';
import { CounterComponent } from '../../shared/counter/counter.component';
import { Courses } from '../../interfaces/courses';
import { CoursesService } from '../courses/courses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  courses!: Courses[];

  constructor(private coursesService: CoursesService) {
    this.coursesService.getCourses(1).subscribe((data) => {
      this.courses = data.courses;
    });
  }

  ngOnInit(): void {}
}
