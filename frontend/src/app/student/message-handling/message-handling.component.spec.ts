import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageHandlingComponent } from './message-handling.component';

describe('MessageHandlingComponent', () => {
  let component: MessageHandlingComponent;
  let fixture: ComponentFixture<MessageHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
