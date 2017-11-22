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
});
