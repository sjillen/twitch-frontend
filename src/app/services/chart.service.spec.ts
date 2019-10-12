import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartService = TestBed.get(ChartService);
    expect(service).toBeTruthy();
  });

  it('should format a collection of Snapshots into an Observable collection of ChartData', () => {
    const snapshots = [
      {
        gameId: 1,
        viewers: 15,
        timestamp: new Date(Date.now()),
      },
      {
        gameId: 2,
        viewers: 20,
        timestamp: new Date(Date.now()),
      },
    ];

    const result = new ChartService().formatSnapshots(snapshots);
    result.subscribe(chartDatas => {
      expect(chartDatas.length).toEqual(2);
      expect(chartDatas[0]).toEqual({
        name: snapshots[0].gameId,
        series: [{ name: snapshots[0].timestamp, value: snapshots[0].viewers }],
      });
    });
  });

  it('should update Snapshots into existing ChartDatas', () => {
    const newData = [
      {
        name: 1,
        series: [{ name: new Date(), value: 99 }],
      },
    ];

    const oldData = [
      {
        name: 1,
        series: [{ name: new Date(), value: 100 }],
      },
      {
        name: 2,
        series: [{ name: new Date(), value: 4 }],
      },
    ];

    const result = new ChartService().updateSnapshots(oldData, newData);
    expect(result.length).toEqual(2);
    expect(result[0].name).toEqual(1);
    expect(result[1].name).toEqual(2);
    expect(result[0].series.length).toEqual(2);
    expect(result[1].series.length).toEqual(1);
  });

  it('should update ChartData name from gameId to to the right gameName', () => {
    const toUpdate = {
      name: 1,
      series: [{ name: new Date(), value: 100 }],
    };
    const games = [
      { name: 'first game', twitchId: 1, boxArtUrl: '' },
      { name: 'second game', twitchId: 2, boxArtUrl: '' },
    ];

    const updated = new ChartService().updateChartDataName(toUpdate, games);
    expect(updated.name).toEqual('first game');
  });

  it('should update all ChartDatas names to the right gameName', () => {
    const toUpdate = [
      {
        name: 1,
        series: [{ name: new Date(), value: 100 }],
      },
      {
        name: 2,
        series: [{ name: new Date(), value: 10 }],
      },
    ];
    const games = [
      { name: 'first game', twitchId: 1, boxArtUrl: '' },
      { name: 'second game', twitchId: 2, boxArtUrl: '' },
    ];

    const updated = new ChartService().updateChartDataNames(toUpdate, games);
    expect(updated[0].name).toEqual('first game');
    expect(updated[1].name).toEqual('second game');
  });
});
