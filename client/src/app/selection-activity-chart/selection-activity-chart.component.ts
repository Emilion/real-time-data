import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectionActivityChartService } from "./selection-activity-chart.service";
import { Constants } from "../constants";

@Component({
  selector: 'app-selection-activity-chart',
  templateUrl: './selection-activity-chart.component.html',
  styleUrls: [ './selection-activity-chart.component.scss' ]
})
export class SelectionActivityChartComponent implements OnInit, OnChanges {


  @Input() data: any;
  public chartOptions: any;
  public chartDatasets: any;
  public chartLabels: any;

  private limitedChartData: any;

  constructor(private selectionChartService: SelectionActivityChartService) {
  }

  private initChartOptions() {
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: false,
      barThickness: 10,
      scales: {
        xAxes: [ {
          stacked: true,
          barThickness: 40,

          ticks: {
            beginAtZero: true,
            min: '2008'
          }
        } ],
        yAxes: [ {
          stacked: true
        } ]
      },
      legend: {
        display: true,
      },
      tooltips: {
        mode: 'x'
      },
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        // animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0

    }
  }


  ngOnInit() {
    this.initChartOptions();
    this.chartDatasets = [{data: [], labels: []}];
    this.chartLabels = [];
  }

  /**
   * On Changes LifeCycleHook
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {

    if (changes[ 'data' ] && !!changes[ 'data' ].currentValue) {
      // Make a limit of the data in terms of the requirement
      let _change = changes[ 'data' ];
      let config;
      if(_change.currentValue.length > Constants.chartConfig.limitDays) {
          let limitedData = _change.currentValue.splice(0, (this.data.length - Constants.chartConfig.limitDays));
        this.limitedChartData = [...limitedData];
      } else {
        this.limitedChartData = [..._change.currentValue];
      }

      let lastSelection = this.limitedChartData[this.limitedChartData.length - 1];

      if (!_change.previousValue || _change.currentValue.length > _change.previousValue.length) {
        config = this.selectionChartService.mapToDataSetModel(lastSelection, false);
      } else {
        config = this.selectionChartService.mapToDataSetModel(lastSelection, true);
      }
      console.log(config);
      this.chartDatasets = config.datasets;
      this.chartLabels = [...config.labels];

    }
  }


  /**
   * CHART
   * @type {{scaleShowVerticalLines: boolean; responsive: boolean}}
   */

  public barChartLabels: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A'},
    {data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B', type: 'line'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
