import { Component, OnInit, Input } from '@angular/core';
import { from, of, zip, Observable } from 'rxjs';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';
import { SnapshotService } from '../snapshot.service';
import { Snapshot } from '../models/snapshot';
import { Game } from '../models/game';
import { ChartData } from '../chartData';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  data: ChartData[] = [];
  history: ChartData[] = [];
  loading = false;
  realTime = true;

  title = 'Twitch Viewers Count';
  ticks;
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition = 'below';
  legendTitle = this.title;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Viewers';
  autoScale = true;
  multi: ChartData[];
  timeline = true;
  showGridLines = false;
  curve = shape.curveNatural;
  xAxisTickFormatting = this.axisFormat;
  rotateXAxisTicks = false;
  trimXAxisTicks = false;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };

  @Input() games: Game[];

  // pie
  constructor(private snapshotService: SnapshotService) {}

  ngOnInit() {
    this.fetchSnapshots();
    this.getLatestSnapshots();
  }

  private axisFormat(val) {
    if (
      this.ticks[0] === val ||
      this.ticks[this.ticks.length - 1] === val ||
      this.ticks[(this.ticks.length - 1) / 2] === val
    ) {
      return new Date(val).toLocaleString('en-GB', { timeZone: 'UTC' });
    } else {
      return '';
    }
  }

  fetchSnapshots() {
    this.snapshotService.getSnapshots().subscribe(snapshots => {
      this.formatSnapshots(snapshots).subscribe(result => {
        this.multi = this.updateChartDataNames(result);
      });
    });
  }

  formatSnapshots(snapshots: Snapshot[]): Observable<any[]> {
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

  getLatestSnapshots() {
    this.snapshotService.snapshots.subscribe(snapshots => {
      this.formatSnapshots(snapshots).subscribe(result => {
        if (!this.multi || !this.multi.length) {
          this.multi = result;
        } else {
          this.updateSnapshots(this.multi, result);
        }
        this.updateChartDataNames(this.multi);
        this.multi = [...this.multi];
      });
    });
  }

  updateSnapshots(currents: ChartData[], latests: ChartData[]): void {
    for (let i = 0; i < currents.length; i++) {
      for (const latest of latests) {
        if (currents[i].name === latest.name) {
          currents[i].series.push(latest.series[0]);
        }
      }
    }
  }

  updateChartDataNames(chartDatas: ChartData[]): ChartData[] {
    chartDatas.forEach(charData => this.updateChartDataName(charData));
    return chartDatas;
  }

  updateChartDataName(chartData: ChartData) {
    for (const game of this.games) {
      if (game.twitchId === chartData.name) {
        chartData.name = game.name;
      }
    }
  }
}
