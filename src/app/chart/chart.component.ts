import { Component, OnInit } from '@angular/core';
import { SnapshotService } from '../snapshot.service';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  data: any[] = [];

  title = 'Twitch Viewers Count';
  view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Timestamps';
  showYAxisLabel = true;
  yAxisLabel = 'Viewers';
  timeline = true;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };

  // pie
  showLabels = true;
  constructor(private snapshotService: SnapshotService) {}

  ngOnInit() {}

  formatData() {
    this.snapshotService.getSnapshots().pipe();
  }
}
