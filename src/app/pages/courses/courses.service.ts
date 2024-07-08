import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../../interfaces/courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private accessToken: string;
  http = inject(HttpClient);

  constructor() {
    this.accessToken = localStorage.getItem('token') || '';
  }

  createCourse(course: FormData) {
    if (!this.accessToken) throw new Error('User Not Authenticated');
    return this.http.post('http://localhost:3000/courses', course, {
      headers: {
        Authorization: 'Bearer' + this.accessToken,
      },
    });
  }

  editCourse(course: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
  }) {
    if (!this.accessToken) throw new Error('User Not Authenticated');
    return this.http.patch(
      `http://localhost:3000/courses/edit/${course.id}`,
      course,
      {
        headers: {
          Authorization: 'Bearer ' + this.accessToken,
        },
      },
    );
  }

  getCourses(page: number) {
    return this.http.get<any>(`http://localhost:3000/courses?page=${page}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
  getMyCourses(page: number): Observable<any> {
    if (!this.accessToken) throw new Error('User Not Authenticated');

    return this.http.get<any>(
      `http://localhost:3000/courses/mycourses?page=${page}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.accessToken,
        },
      },
    );
  }

  getCourseById(id: string) {
    return this.http.get(`http://localhost:3000/courses/${id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}
