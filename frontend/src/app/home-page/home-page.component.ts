import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    '../app.component.css',
    './home-page.component.css'
  ]
})
export class HomePageComponent implements OnInit {

  pageDescription;
  
  constructor() { }

  ngOnInit() {
    this.pageDescription = "All CRUD Operations on <code>Student</code>, <code>Admin</code> and <code>Course</code> schemas"
  }

}
