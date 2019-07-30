import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit() {}

  setArtSize(boxArtUrl, width = 600, height = 800) {
    return (boxArtUrl = boxArtUrl
      .replace('{width}', width.toString())
      .replace('{height}', height.toString()));
  }
}
