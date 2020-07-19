import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { MessageHandlingComponent } from './message-handling/message-handling.component';
import { FormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';


@NgModule({
  declarations: [AllRoutesComponent, MessageHandlingComponent, AddStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule
  ],
  exports: [MessageHandlingComponent]
})
export class StudentModule { }
