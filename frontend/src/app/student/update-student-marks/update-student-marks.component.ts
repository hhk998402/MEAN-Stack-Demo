import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { StudentRoutesService } from '../all-routes/service/student-routes.service';

@Component({
  selector: 'app-update-student-marks',
  templateUrl: './update-student-marks.component.html',
  styleUrls: [
    '../../app.component.css',
    './update-student-marks.component.css'
  ]
})
export class UpdateStudentMarksComponent implements OnInit {
  idToUpdate;
  pageDescription;
  isLoading = true;
  apiError;
  apiSuccess;

  constructor(private activatedRoute: ActivatedRoute, private _studentService: StudentRoutesService, private router: Router) { }

  ngOnInit(): void {
    this.pageDescription = "Perform marks update for a particular student on <code>Student</code> schema"
    this.activatedRoute.params.subscribe(params => {
      this.idToUpdate = params['_id'];
      console.log(this.idToUpdate);
      this._studentService.getStudentDetail(this.idToUpdate)
      .subscribe(
        res => {
          this.isLoading = false;
          this.apiSuccess = res;
          console.log("Data", this.apiSuccess);
        },
        err => {
          this.isLoading = false;
          this.apiError = err;
          console.log("Error", this.apiError);
        }
      );
    });
  }

  updateStudentMarks(f){
    console.log("UPDATE STUDENT",f.value);
    var marksData = [];
    JSON.parse(JSON.stringify(f.value), function (key, value) {
        var splitStr = key.split("score-");
        var courseCode = splitStr[splitStr.length - 1];
        if(courseCode.length > 0)
          marksData.push({
            courseCode: courseCode,
            score: value
          });
    });
    var course;
    for(course of marksData){
      if(course['score'] === null || course['score'] === undefined || !(/^-?[\d.]+(?:e-?\d+)?$/.test(course['score']))) {
          course['score'] = this.apiSuccess.data.marks.find(item => {
                    return item.courseCode === course['courseCode']
                }).score;
      }
    }
    console.log("Data to be updated",marksData);

    //Send PATCH request to update marks
    this._studentService.updateStudentMarks(this.idToUpdate, marksData)
      .subscribe(
        res => {
          this.isLoading = false;
          this.apiSuccess = res;
          this.apiError = null;
          console.log("Data", this.apiSuccess);
          setTimeout(()=>{ 
            this.reloadPage();
            }, 2000);
        },
        err => {
          this.isLoading = false;
          this.apiError = err;
          this.apiSuccess = null;
          console.log("Error", this.apiError);
        }
      );
  };

  removeCourse(courseNum){
    this.apiSuccess.data.marks.splice(courseNum, 1);
    console.log("AFTER REMOVE",this.apiSuccess.data.marks);
  };

  addCourse(f){
    console.log(f.value.newCourseCode)
    if(this.apiSuccess.data.marks.find(item => {
      return item.courseCode === f.value.newCourseCode
    })){
      this.apiError = {};
      this.apiError.error = "Course Already Exists";
      this.apiError.message = "This course already exists";
    }
    else
      this.apiSuccess.data.marks.push({
        courseCode: f.value.newCourseCode,
        score: 0
      });
  };

  reloadPage(){
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/student']);
    }); 
  }

}
