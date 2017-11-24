import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';
import { SelectionActivityService } from './selection-activity.service';
import { HttpModule } from '@angular/http';
import { SelectionActivityChartModule } from './selection-activity-chart/selection-activity-chart.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SelectionActivityChartModule,
    HttpModule
  ],
  providers: [WebsocketService, SelectionActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
