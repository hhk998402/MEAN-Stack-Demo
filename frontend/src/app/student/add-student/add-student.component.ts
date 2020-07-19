import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentRoutesService } from '../all-routes/service/student-routes.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: [
    '../../app.component.css',
    './add-student.component.css'
  ]
})
export class AddStudentComponent implements OnInit {
  pageDescription;
  isLoading = false;
  createStudentData:any;
  apiError;
  apiSuccess;

  constructor(private _studentService: StudentRoutesService, private router: Router) { }

  ngOnInit(): void {
    this.pageDescription = "Add/Create Student in <code>Student</code> schema";
  }

  createStudent(f: NgForm){
    this.isLoading = true;
    console.log("HELLO");
    console.log(f.value);
    this._studentService.createStudent(f.value)
      .subscribe(
        res => {
          this.isLoading = false;
          this.apiSuccess = res;
          console.log("Data", this.apiSuccess);
          this.apiError = null;
        },
        err => {
          this.isLoading = false;
          this.apiError = err;
          console.log("Error", this.apiError);
          this.apiSuccess = null;
        }
      );
  }
  reloadPage(){
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/student']);
    }); 
  }

}
