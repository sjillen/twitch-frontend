import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => (this.games = games));
  }

  add(name: string, twitchId: number): void {
    name = name.trim();
    if (!name || !twitchId) {
      return;
    }

    this.gameService
      .addGame({ name, twitchId } as Game)
      .subscribe(game => this.games.push(game));
  }

  delete(game: Game): void {
    this.games = this.games.filter(g => g !== game);
    this.gameService.deleteGame(game).subscribe();
  }
}
