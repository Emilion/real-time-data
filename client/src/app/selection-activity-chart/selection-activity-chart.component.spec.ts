import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionActivityChartComponent } from './selection-activity-chart.component';

describe('SelectionActivityChartComponent', () => {
  let component: SelectionActivityChartComponent;
  let fixture: ComponentFixture<SelectionActivityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionActivityChartComponent ]
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
});
