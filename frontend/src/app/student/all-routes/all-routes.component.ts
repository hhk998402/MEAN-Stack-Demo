import { Component, OnInit } from '@angular/core';
import { StudentRoutesService } from './service/student-routes.service';
import { Subscription, Observable } from 'rxjs';
import { ApiResponseFormat } from '../model/api-response-format';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrls: [
    '../../app.component.css',
    './all-routes.component.css'
  ]
})
export class AllRoutesComponent implements OnInit {
  pageDescription;
  apiSuccess = null;
  apiError = null;
  isLoading = true;

  constructor(private _studentService: StudentRoutesService, private router: Router) { }

  ngOnInit(): void {
    this.pageDescription = "All CRUD operations on <code>Student</code> schema";

    this._studentService.getAllStudents()
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
  }

  public deleteStudent(event, _id) {
    this.isLoading = true;
    this._studentService.deleteStudent(_id)
      .subscribe(
        res => {
          this.isLoading = false;
          this.apiSuccess = res;
          console.log("Data", this.apiSuccess);
          setTimeout(()=>{ 
            this.reloadPage();
           }, 2000);
        },
        err => {
          this.isLoading = false;
          this.apiError = err;
          console.log("Error", this.apiError);
        }
      );
  };

  reloadPage(){
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/student']);
    }); 
  }

}
