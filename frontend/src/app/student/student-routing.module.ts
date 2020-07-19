import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { StudentRoutesService } from './all-routes/service/student-routes.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentMarksComponent } from './update-student-marks/update-student-marks.component';

const routes: Routes = [
  {
    path: "",
    component: AllRoutesComponent
  },
  {
    path: "createStudent",
    component: AddStudentComponent
  },
  {
    path: "updateStudentMarks/:_id",
    component: UpdateStudentMarksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  declarations: [],
  providers: [StudentRoutesService]
})
export class StudentRoutingModule { }
