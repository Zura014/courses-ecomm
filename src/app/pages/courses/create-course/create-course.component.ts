import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  selectedFile!: File;

  ngOnInit(): void {}

  constructor(private coursesService: CoursesService, private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      course_title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: [],
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createCourse() {
    if (this.courseForm.valid) {
      const formData = new FormData();
      formData.append(
        'course_title',
        this.courseForm.get('course_title')?.value
      );
      formData.append('description', this.courseForm.get('description')?.value);
      formData.append('price', this.courseForm.get('price')?.value);

      if (this.selectedFile) {
        formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
      } else {
        alert('Please select an image file.');
        return;
      }

      this.coursesService.createCourse(formData).subscribe((response) => {
        console.log('Course created successfully:', response);
        window.location.reload();
        window.location.href = '/courses';
      });
    }
  }
}
