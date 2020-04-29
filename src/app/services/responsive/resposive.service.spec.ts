import { TestBed } from '@angular/core/testing';

import { ResposiveService } from './resposive.service';

describe('ResposiveService', () => {
  let service: ResposiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResposiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
