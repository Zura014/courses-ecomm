import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseTemplateComponent } from './course-template/course-template.component';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [
    CourseDetailsComponent,
    CourseTemplateComponent
  ],
  imports: [
    CommonModule,
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
      }
    ])
  ],
  exports: [
    CourseTemplateComponent
  ]
})
export class CoursesModule { }
