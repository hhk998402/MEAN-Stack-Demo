import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRoutesComponent } from './all-routes.component';
import { MessageHandlingComponent, MessageHandlingStubComponent } from '../message-handling/message-handling.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AllRoutesComponent', () => {
  let component: AllRoutesComponent;
  let fixture: ComponentFixture<AllRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRoutesComponent, MessageHandlingStubComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

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
