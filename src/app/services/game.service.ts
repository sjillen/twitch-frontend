import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gamesUrl = `${environment.baseUrl}/games`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl).pipe(
      tap(_ => this.log('fetched games')),
      catchError(this.handleError<Game[]>('getGames', []))
    );
  }

  getGame(twitchId: number): Observable<Game> {
    const url = `${this.gamesUrl}/${twitchId}`;
    return this.http.get<Game>(url).pipe(
      tap(_ => this.log(`fetched game ${twitchId}`)),
      catchError(this.handleError<Game>(`getGame ${twitchId}`))
    );
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, this.httpOptions).pipe(
      tap((newGame: Game) =>
        this.log(`added new game with twitch ID ${newGame.twitchId}`)
      ),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  deleteGame(game: Game | number): Observable<Game> {
    const twitchId = typeof game === 'number' ? game : game.twitchId;
    const url = `${this.gamesUrl}/${twitchId}`;
    return this.http.delete<Game>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted game ${twitchId}`)),
      catchError(this.handleError<Game>('deleteGame'))
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
