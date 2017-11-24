import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionActivityChartComponent } from './selection-activity-chart.component';
import { ChartsModule } from 'ng2-charts';
import { SelectionActivityChartService } from './selection-activity-chart.service';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [SelectionActivityChartComponent],
  exports: [SelectionActivityChartComponent],
  providers: [SelectionActivityChartService]
})
export class SelectionActivityChartModule { }
