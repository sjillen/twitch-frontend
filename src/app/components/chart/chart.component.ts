import { Component, OnInit, Input } from '@angular/core';
import { SnapshotService } from '../../services/snapshot.service';
import { Game } from '../../models/game';
import { ChartData } from '../../models/chartData';
import { ChartService } from '../../services/chart.service';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  data: ChartData[] = [];
  history: ChartData[] = [];
  isRealTime = false;

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
    domain: ['#9370DB', '#87CEFA', '#FA8072'],
  };

  @Input() games: Game[];

  constructor(
    private snapshotService: SnapshotService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.fetchSnapshots();
    this.getLatestSnapshots();
  }

  switchDisplay() {
    if (this.isRealTime) {
      this.fetchSnapshots();
      this.isRealTime = false;
    } else {
      this.multi = [];
      this.isRealTime = true;
    }
  }

  fetchSnapshots() {
    this.snapshotService.getSnapshots().subscribe(snapshots => {
      this.chartService.formatSnapshots(snapshots).subscribe(result => {
        this.multi = this.chartService.updateChartDataNames(result, this.games);
      });
    });
  }

  getLatestSnapshots() {
    this.snapshotService.snapshots.subscribe(snapshots => {
      this.chartService.formatSnapshots(snapshots).subscribe(result => {
        const formatResult = this.chartService.updateChartDataNames(
          result,
          this.games
        );
        this.reassignData(formatResult);
      });
    });
  }

  private reassignData(incomingData: ChartData[]) {
    if (!this.multi || !this.multi.length) {
      this.multi = incomingData;
    } else {
      this.multi = this.chartService.updateSnapshots(this.multi, incomingData);
    }
    this.multi = this.chartService.updateChartDataNames(this.multi, this.games);
    this.multi = [...this.multi];
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
}
