import {Injectable} from '@angular/core';

@Injectable()
export class SelectionActivityChartService {

  private dataSet: any;
  private chartLabels: string[];
  private maxTicks = 30; // configuration property about max shown ticks on the chart

  constructor() {
    this.dataSet = [
      {data: [], label: 'totalCallsAdded', yAxisID: 'totalCallsAdded'},
      {data: [], label: 'totalCallsRemoved', yAxisID: 'totalCallsRemoved'},
      {data: [], label: 'segmentSize', type: 'line', yAxisID: 'segmentSize'},
    ];
    this.chartLabels = [];
  }

  /**
   * Add Tick to DataSet
   * The limiter would remove first needless ticks and will leave last [maxTicks]
   *
   * @param selection
   * @returns {any}
   */
  addTick(selection: any): any {
    let xValue = new Date(selection['key']['dayTimestamp']).toDateString();
    this.dataSet.forEach((val) => {
      const tick = {
        x: xValue, y: selection[val.label]
      };
      val.data.push(tick);
    });
    // add labels
    this.addLabels(xValue);
    // Limiter would leave only the last [maxTicks]
    this.limiter();

    return this.dataSet;
  }

  /**
   * Add label to the current labels Array
   * @param {string} label
   */
  addLabels(label: string): void {
    this.chartLabels.push(label);
  }

  /**
   * Update the last record.
   *
   * @param selection
   * @returns {any}
   */
  updateLastTick(selection: any): any {
    this.dataSet.forEach((val) => {
      let tick = {
        x: new Date(selection['key']['dayTimestamp']).toDateString(), y: selection[val.label]
      };
      val.data.pop();
      val.data.push(tick);
    });
    return this.dataSet;
  }

  /**
   * Limiter is removing needless ticks and their labels
   */
  private limiter(): void {
    this.dataSet.forEach((val, index) => {
      if (val.data.length > this.maxTicks) {
        val.data.splice(0, (val.data.length - this.maxTicks));
        console.log(val.data);
        if (index === this.dataSet.length - 1) {
          this.chartLabels.splice(0, (this.chartLabels.length - this.maxTicks))
        }
      }
    });

  }

  initDataset(selections: any) {
    selections.forEach(val => {
      this.addTick(val);
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
