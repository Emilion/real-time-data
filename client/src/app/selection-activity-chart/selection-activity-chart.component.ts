import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectionActivityChartService } from "./selection-activity-chart.service";

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
  public chartColors:Array<any>;

  private currentDays: any;

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
      elements: {
          pointStyle: 'star'
      },
      scales: {
        xAxes: [ {
          distribution: 'series',
          stacked: true,
          barThickness: 20,

          ticks: {
            beginAtZero: true
          }
        }
        ],
        yAxes: [
          {
            type: 'linear',
            display: false,
            position: 'right',
            id: 'segmentSize',
            ticks: {
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

    };
  }

  /**
   * OnInit angular LifeCycleHook
   */
  ngOnInit() {
    this.initChartOptions();
    this.initChartColors();
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
      let modifiedChartDataset;

      // create a new instance of the server data
        this.currentDays = [ ..._change.currentValue ];

        // get the last element
      let lastDay = this.currentDays[ this.currentDays.length - 1 ];

      // check if it first change - there is a method isFirstChange() but most of the times returns true twice or triple
      // so we need to ensure that we really have our first change
      if (!_change.previousValue && !!_change.currentValue) {
        // Init the dataset and assign both DataSet and Labels to current chart config properties
        this.selectionChartService.initDataset(this.currentDays);
        this.chartDatasets = this.selectionChartService.datasets;
        this.chartLabels = [ ...this.selectionChartService.labels ];
        return;
      }

      // Checks when we need to update or add new tick.
      if (_change.currentValue.length > _change.previousValue.length) {
        modifiedChartDataset = this.selectionChartService.addTick(lastDay);
      } else {
        modifiedChartDataset = this.selectionChartService.updateLastTick(lastDay);
      }
      // assign dataset and labels
      this.chartDatasets = modifiedChartDataset;
      this.chartLabels = [ ...this.selectionChartService.labels ];
    }
  }

  initChartColors() {
    this.chartColors = [
      { // line blue
        backgroundColor: 'rgba(77,178,255,0)',
        borderColor: 'rgba(77,178,255,1)',
        pointBackgroundColor: 'rgba(148,159,177,0)',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: 'rgba(77,178,255,1)',
        pointHoverBorderColor: 'rgba(255,255,255,0.8)'
      },
      { // blue
        backgroundColor: 'rgba(6,113,170,1)',
        borderColor: 'rgba(148,159,177,1)'
      },
      { // dark grey
        backgroundColor: 'rgba(161,161,161,1)',
        borderColor: 'rgba(161,161,161,1)'
      }
    ];
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
