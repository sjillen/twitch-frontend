import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SnapshotService } from './snapshot.service';
import { SocketIoModule } from 'ngx-socket-io';

describe('SnapshotService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [HttpClient, SocketIoModule],
    })
  );

  it('should be created', () => {
    const service: SnapshotService = TestBed.get(SnapshotService);
    expect(service).toBeTruthy();
  });
});
