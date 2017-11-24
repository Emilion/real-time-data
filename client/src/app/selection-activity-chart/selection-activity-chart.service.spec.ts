import { TestBed, inject } from '@angular/core/testing';

import { SelectionActivityChartService } from './selection-activity-chart.service';

describe('SectionChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionActivityChartService]
    });
  });

  it('should be created', inject([SelectionActivityChartService], (service: SelectionActivityChartService) => {
    expect(service).toBeTruthy();
  }));
  it('should add labels', inject([SelectionActivityChartService], (service: SelectionActivityChartService) => {
    service.addLabels('label');
    expect(service.labels.length).toBeGreaterThan(0);
  }));

  it('should label be string', inject([SelectionActivityChartService], (service: SelectionActivityChartService) => {
    service.addLabels('label');
    expect(typeof service.labels[0]).toBe('string');
  }));

});
