import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class CoursesService {
    
    private _getCourseUrl = 'http://localhost:3000/courses/getAllCourses'


    getCourses() {

    }
}