import { Component, OnInit, Input } from '@angular/core';

const message_handling_selector = 'app-message-handling';
@Component({
  selector: message_handling_selector,
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

@Component({ selector: message_handling_selector, template: '' })
export class MessageHandlingStubComponent implements Partial<MessageHandlingComponent> {
  @Input() errorResponse;
  @Input() successResponse;

  constructor() { }

  ngOnInit(): void {
  }
}
