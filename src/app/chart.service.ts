import { Injectable } from '@angular/core';
import { from, of, zip, Observable } from 'rxjs';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';
import { ChartData } from './models/chartData';
import { Game } from './models/game';
import { Snapshot } from './models/snapshot';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  formatSnapshots(snapshots: Snapshot[]): Observable<ChartData[]> {
    return from(snapshots).pipe(
      groupBy(
        snap => snap.gameId,
        s => {
          return { name: s.timestamp, value: s.viewers };
        }
      ),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      map(row => {
        return Object.assign(new ChartData(), {
          name: row[0],
          series: row[1],
        });
      }),
      toArray()
    );
  }

  updateSnapshots(currents: ChartData[], latests: ChartData[]): ChartData[] {
    for (let i = 0; i < currents.length; i++) {
      for (const latest of latests) {
        if (currents[i].name === latest.name) {
          currents[i].series.push(latest.series[0]);
        }
      }
    }
    return currents;
  }

  updateChartDataNames(chartDatas: ChartData[], games: Game[]): ChartData[] {
    return chartDatas.map(charData =>
      this.updateChartDataName(charData, games)
    );
  }

  updateChartDataName(chartData: ChartData, games: Game[]) {
    for (const game of games) {
      if (game.twitchId === chartData.name) {
        chartData.name = game.name;
      }
    }
    return chartData;
  }
}
