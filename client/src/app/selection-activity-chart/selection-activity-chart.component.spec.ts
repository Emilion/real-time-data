import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionActivityChartComponent } from './selection-activity-chart.component';
import {ChartsModule} from 'ng2-charts';
import {CommonModule} from '@angular/common';
import {SelectionActivityChartService} from './selection-activity-chart.service';
import { By } from "@angular/platform-browser";

describe('SelectionActivityChartComponent', () => {
  let component: SelectionActivityChartComponent;
  let fixture: ComponentFixture<SelectionActivityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionActivityChartComponent ],
      imports: [CommonModule,
        ChartsModule],
      providers: [SelectionActivityChartService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionActivityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should be bar chart`, async(() => {
    const fixture = TestBed.createComponent(SelectionActivityChartComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component.chartType).toEqual('bar');
  }));
  it(`should bar chart into div`, async(() => {
    const fixture = TestBed.createComponent(SelectionActivityChartComponent);
    const component = fixture.debugElement.query(By.css('div.chart-wrapper'));
    expect(component.children[0].nativeElement.tagName.toLowerCase()).toBe('canvas');
  }));
});
