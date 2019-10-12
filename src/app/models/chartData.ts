interface Serie {
  name: Date;
  value: number;
}

export interface ChartData {
  name: number | string;
  series: Serie[];
}
