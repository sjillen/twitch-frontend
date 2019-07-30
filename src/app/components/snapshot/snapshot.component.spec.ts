import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SnapshotComponent } from './snapshot.component';
import { SnapshotService } from '../../services/snapshot.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Observable } from 'rxjs';
import { SocketIoModule } from 'ngx-socket-io';

class MockSocket {
  getComments() {
    return of();
  }
}
xdescribe('SnapshotComponent', () => {
  let component: SnapshotComponent;
  let fixture: ComponentFixture<SnapshotComponent>;
  const mockSock = new MockSocket();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnapshotComponent],
      imports: [HttpClientTestingModule, SocketIoModule],
      providers: [SnapshotService, SocketIoModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
