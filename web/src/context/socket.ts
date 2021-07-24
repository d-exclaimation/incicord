//
//  socket.ts
//  web
//
//  Created by d-exclaimation on 22:38.
//
import { RIncident } from "../models/Incident";
import { Cognizance } from "./../models/Cognizance";
import { handleEvent, Snapshot, SnapshotHandlers } from "./../models/Snapshot";
import { enqueue } from "./../utils/enqueue";

export class SocketClient {
  private websocket: WebSocket | null = null;
  constructor(public url: string) {}

  connect(): void {
    this.websocket = new WebSocket(this.url);
  }

  pipe<T>(transform: (arg: SocketClient) => T): T {
    return transform(this);
  }

  onMessage(handler: SnapshotHandlers<RIncident, RIncident, RIncident>): void {
    enqueue(() => {
      if (!this.websocket) return;
      this.websocket.onmessage = (ev: MessageEvent<string>) => {
        const raw: Snapshot<RIncident, RIncident, RIncident> & Cognizance =
          JSON.parse(ev.data);

        if (raw.validation && !raw.operation) return Cognizance(ev.data);

        const data: Snapshot<RIncident, RIncident, RIncident> = Snapshot(
          ev.data
        );
        handleEvent(data, handler);
      };
    });
  }
}
