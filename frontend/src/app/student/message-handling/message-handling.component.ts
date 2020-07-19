import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-handling',
  templateUrl: './message-handling.component.html',
  styleUrls: [
    '../../app.component.css',
    './message-handling.component.css'
  ]
})
export class MessageHandlingComponent implements OnInit {
  @Input() errorResponse;
  @Input() successResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
