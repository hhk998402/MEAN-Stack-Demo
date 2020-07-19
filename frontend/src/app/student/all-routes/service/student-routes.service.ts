import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseFormat } from "../../model/api-response-format";

@Injectable({
  providedIn: 'root'
})
export class StudentRoutesService {

  private _getAllStudentsUrl = "http://localhost:3000/student/getAllStudents/";
  private _deleteStudent = "http://localhost:3000/student/deleteStudent/";
  private _createStudent =  "http://localhost:3000/student/addStudent/";

  constructor(private http: HttpClient) { }

  getAllStudents(){
    return this.http.get<any>(this._getAllStudentsUrl);
  }

  deleteStudent(_id:String){
    return this.http.delete<any>(this._deleteStudent + _id);
  }

  createStudent(data){
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    console.log("DATA",data);
    return this.http.post<any>(this._createStudent, data, config);
  }

}
