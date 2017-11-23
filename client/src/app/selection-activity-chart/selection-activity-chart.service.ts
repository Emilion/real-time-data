import { Injectable } from '@angular/core';

@Injectable()
export class SelectionActivityChartService {

  private dataSet: any;
  private chartLabels: string[];
  constructor() {
    this.dataSet = [
      {data: [], label: 'totalCallsAdded', yAxisID: 'totalCallsAdded'},
      {data: [], label: 'totalCallsRemoved', yAxisID: 'totalCallsRemoved'},
      {data: [], label: 'segmentSize', type: 'line', yAxisID: 'segmentSize'},
      ];
    this.chartLabels = [];
  }

  mapToDataSetModel(selection: any, update: boolean): {datasets: any, labels: string[]} {
    if(update) {
      this.updateDataSet(selection);
    } else {
      this.addToDataSet(selection);
    }

    return {
      datasets: this.datasets,
      labels: this.labels
    }
  }

  addToDataSet(selection: any): void {
    this.dataSet.forEach((val) => {
      val.data.push(selection[val.label])
    });
      this.addLabels(selection);
  }

  addLabels(selection: any): void  {
    console.log('add label', selection);
    this.chartLabels.push(selection.key.dayTimestamp);
  }

  updateDataSet(selection: any): void {
    this.dataSet.forEach((val) => {
    val.data.pop();
    val.data.push(selection[val.label]);
    })
  }

  /**
   * GETTERS & SETTERS
   *
   */
  public get labels(): string[] {
    return this.chartLabels;
  }

  public get datasets(): any {
    return this.dataSet;
  }
}
