import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Snapshot } from '../models/snapshot';

@Injectable({
  providedIn: 'root',
})
export class SnapshotService {
  private snapshotsUrl = `${environment.baseUrl}/snapshots`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  snapshots = this.socket.fromEvent<Snapshot[]>('snapshots');

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private socket: Socket
  ) {}

  getSnapshots(): Observable<Snapshot[]> {
    return this.http.get<Snapshot[]>(this.snapshotsUrl).pipe(
      tap(_ => this.log('fetched snapshots')),
      catchError(this.handleError<Snapshot[]>('getSnapshots', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation}failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
