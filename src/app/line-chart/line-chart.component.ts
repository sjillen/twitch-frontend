import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterContentInit {
  clickeventcount = 0;
  radius = 15;
  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    d3.select('p').style('color', 'red');
  }

  svgclickhandle(event: any) {
    this.clickeventcount += 1;
    let colorname = 'black';
    if (this.clickeventcount % 5 === 0) {
      colorname = 'red';
    } else if (this.clickeventcount % 3 === 0) {
      colorname = 'yellow';
    } else if (this.clickeventcount % 2 === 0) {
      colorname = 'purple';
    }

    console.log(event.target);
    d3.select(event.target)
      .append('circle')
      .attr('cx', event.x)
      .attr('cy', event.y)
      .attr('r', this.radius)
      .attr('fill', colorname);
  }
}
