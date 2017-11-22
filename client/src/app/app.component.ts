import { Component } from '@angular/core';
import { SelectionActivityService } from "./selection-activity.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private selections: any[];
  private watcherObserver: Observable<any[]>;
  private watcher: Observable<any>;
  constructor(private selectionActivityService: SelectionActivityService) {

    // Creates watcher
    this.watcher = this.selectionActivityService.watcher();
    this.watcherObserver = this.selectionActivityService.getSelectionResponse(this.watcher);
    // updating the reference of selection Array.
    this.watcherObserver.subscribe((_selections) => {
      this.selections = _selections;
    });

  }

  /**
   * Stops data generation from the server
   */
  stopWatcher() {
    this.selectionActivityService.stopWatcher();
  }
}
