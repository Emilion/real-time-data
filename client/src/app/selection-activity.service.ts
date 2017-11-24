import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Subscriber} from "rxjs/Subscriber";
import "rxjs/add/operator/map";

@Injectable()
/**
 * This class contains logic, calls etc. regarding to Selection chart view
 */
export class SelectionActivityService {

  private selections: any;
  /**
   * Constructor.
   * @param {WebsocketService} wss
   */
  constructor(private wss: WebsocketService) {
    this.selections = [];
  }

  /**
   * Client connection to the WebSocket server.
   *
   * @returns {Observable<any>}
   */
  watcher(): Observable<any> {
    const subscriber = Subscriber.create(() => {
      this.wss.send(JSON.stringify({message: 'start'}));
    });
    return this.wss.createObservableSocket('ws://localhost:3000', subscriber).map(res => JSON.parse(res));
  }

  /**
   * Stop server data generator timer.
   */
  stopWatcher(): void {
    this.wss.send(JSON.stringify({message: 'stop'}));
  }

  /**
   * It handle the webSocket response. Expected response is the last modified record,
   * so that`s why it needs special
   */
  getSelectionResponse(watcher: Observable<any>): Observable<any[]> {
    // Observer to be returned
    const observer = new Subject<any>();

    // Subscribing the watcher
    watcher.subscribe((res) => {

      // check if the selection appears. This is necessary due to first event respond 2+ records.
      if (this.selections.length === 0) {
        // create new object of the response (immutable)
        this.selections = [...res];

        // Update last record if it has the same segment id as the responded one
      } else if (this.selections[this.selections.length - 1].key.segmentNumber === res.key.segmentNumber) {

        //
        let lastSelection = {...this.selections[this.selections.length - 1]};
        const response = {...res};
        lastSelection = Object.assign(lastSelection, response);

        this.selections[this.selections.length - 1] = lastSelection;

      } else {

        this.selections.push({...res});
      }

      observer.next([...this.selections]);
    },
      // error handler
      onerror => {
      observer.complete();
      },
      // complete handler
      () => {
      observer.complete();
      });

    return observer;
  }
}
