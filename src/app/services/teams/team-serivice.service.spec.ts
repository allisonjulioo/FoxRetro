import { TestBed } from '@angular/core/testing';
import { TeamServiceService } from './team-serivice.service';


describe('TeamServiceService', () => {
  let service: TeamServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
