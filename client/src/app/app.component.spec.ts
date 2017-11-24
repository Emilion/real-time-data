import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {SelectionActivityChartModule} from './selection-activity-chart/selection-activity-chart.module';
import {HttpModule} from '@angular/http';
import {SelectionActivityService} from './selection-activity.service';
import {WebsocketService} from './websocket.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        SelectionActivityChartModule,
        HttpModule
      ],
      providers: [WebsocketService, SelectionActivityService],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
