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
  public chartType: string = 'bar';
  public chartLegend: boolean = true;

  private chartData: any;

  /**
   * Constructor.
   */
  constructor(private selectionChartService: SelectionActivityChartService) {
  }

  /**
   * Init chart options
   */
  private initChartOptions() {
    this.chartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      scales: {
        xAxes: [ {
          distribution: 'series',
          stacked: true,
          barThickness: 20,

          ticks: {
            beginAtZero: true,
            max: 30
          }
        }
        ],
        yAxes: [
          {
            type: 'linear',
            position: 'left',
            id: 'totalCallsAdded',
            ticks: {
              beginAtZero: true,
              suggestedMax: 200,
              suggestedMin: -200
            },
            gridLines: {
              drawOnChartArea: true, // only want the grid lines for one axis to show up
            }
          },
          {
            type: 'linear',
            position: 'right',
            id: 'totalCallsRemoved',
            ticks: {
              reverse: true,
              beginAtZero: true,
              suggestedMax: 200,
              suggestedMin: -200
            },
            gridLines: {
              drawOnChartArea: true
            }
          },
          {
            type: 'linear',
            display: false,
            position: 'right',
            id: 'segmentSize',
            ticks: {
              beginAtZero: true,
              suggestedMax: 1000,
              suggestedMin: -1000
            },
            gridLines: {
              drawOnChartArea: true
            }
          }
        ]
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
      },
      responsiveAnimationDuration: 0

    }
  }

  /**
   * OnInit angular LifeCycleHook
   */
  ngOnInit() {
    this.initChartOptions();
    this.chartDatasets = this.selectionChartService.datasets;
    this.chartLabels = this.selectionChartService.labels;
  }

  /**
   * OnChanges LifeCycleHook
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {

    if (changes[ 'data' ] && !!changes[ 'data' ].currentValue) {
      let _change = changes[ 'data' ];
      let config;

        this.chartData = [ ..._change.currentValue ];

      let lastSelection = this.chartData[ this.chartData.length - 1 ];
      if (!_change.previousValue || _change.currentValue.length > _change.previousValue.length) {
        config = this.selectionChartService.mapToDataSetModel(lastSelection, false);
      } else {
        config = this.selectionChartService.mapToDataSetModel(lastSelection, true);
      }
      this.chartDatasets = config.datasets;
      this.chartLabels = [ ...config.labels ];

    }
  }

  /**
   * events
    */
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
