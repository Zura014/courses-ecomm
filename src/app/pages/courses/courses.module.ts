import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseTemplateComponent } from './course-template/course-template.component';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CourseDetailsComponent,
    CourseTemplateComponent,
    CreateCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoursesComponent,
        children: [
          {
            path: ':id',
            component: CourseDetailsComponent
          }
        ]
      },
      {
        path: 'create',
        component: CreateCourseComponent, //!!!! bug right here Routing needs fixing
      } //!!! Also don't forget to make create edit and fetch for courses.
    ])
  ],
  exports: [
    CourseTemplateComponent
  ]
})
export class CoursesModule { }
