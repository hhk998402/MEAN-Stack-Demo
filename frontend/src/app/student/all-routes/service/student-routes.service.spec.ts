import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs'; // Add import
import { StudentRoutesService } from './student-routes.service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StudentRoutesService', () => {
  let service: StudentRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(StudentRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add tests for getAllStudents() method
  describe('getAllStudents', () => {
    it('should return a list of all students', () => {
      const allStudentsResponse = [
        {
          id: '1',
          name: 'Jane',
          role: 'Designer',
          pokemon: 'Blastoise'
        },
        {
          id: '2',
          name: 'Bob',
          role: 'Developer',
          pokemon: 'Charizard'
        }
      ];
      let response;
      spyOn(service, 'getAllStudents').and.returnValue(of(allStudentsResponse));

      service.getAllStudents().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(allStudentsResponse);
    });
  });
});
