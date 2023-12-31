import { TestBed } from '@angular/core/testing';

import { CommonServiceService } from './common-service.service';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing'

describe('CommonServiceService', () => {
  let service: CommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [provideMockStore({})],
    });
    service = TestBed.inject(CommonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

