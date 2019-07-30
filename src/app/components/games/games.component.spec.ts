import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Observable } from 'rxjs';
import { SocketIoModule } from 'ngx-socket-io';

import { GamesComponent } from './games.component';

class MockSocket {
  getComments() {
    return of();
  }
}

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  const mockSock = new MockSocket();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GamesComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: SocketIoModule, useValue: mockSock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
