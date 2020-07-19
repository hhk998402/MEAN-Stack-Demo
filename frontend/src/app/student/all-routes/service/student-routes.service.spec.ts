import { TestBed } from '@angular/core/testing';

import { StudentRoutesService } from './student-routes.service';

describe('StudentRoutesService', () => {
  let service: StudentRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
