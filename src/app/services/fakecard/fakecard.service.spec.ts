/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FakecardService } from './fakecard.service';

describe('Service: Fakecard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakecardService]
    });
  });

  it('should ...', inject([FakecardService], (service: FakecardService) => {
    expect(service).toBeTruthy();
  }));
});
