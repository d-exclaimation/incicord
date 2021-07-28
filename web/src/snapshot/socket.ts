import { Context, useContext, useEffect, useRef } from "react";
import { enqueue } from "../utils/enqueue";
import { Cognizance } from "./Cognizance";
import { handleEvent, Snapshot, SnapshotHandlers } from "./Snapshot";

export class SocketClient<
  C extends object,
  M extends object,
  D extends object
> {
  private websocket: WebSocket | null = null;
  private messageHandler: Function | null = null;
  constructor(public url: string) {}

  connect(): void {
    this.websocket = new WebSocket(this.url);
  }

  pipe<T>(transform: (arg: SocketClient<C, M, D>) => T): T {
    return transform(this);
  }

  onMessage(handler: SnapshotHandlers<C, M, D>): void {
    enqueue(() => {
      if (!this.websocket) return;
      this.messageHandler = (ev: MessageEvent<string>) => {
        const raw: Snapshot<C, M, D> & Cognizance = JSON.parse(ev.data);
        console.log({ raw });
        if (raw.timestamp && !raw.operation) return Cognizance(ev.data);

        const data: Snapshot<C, M, D> = Snapshot(ev.data);
        handleEvent(data, handler);
      };
      this.websocket.onmessage = this.messageHandler.bind(this);
    });
  }

  wipe(): void {
    if (!this.websocket) return;
    this.websocket.removeEventListener(
      "message",
      this.messageHandler?.bind(this)
    );
    this.websocket.close();
  }
}

export function useSnapshotInstance<
  C extends object,
  M extends object,
  D extends object
>(
  url: string,
  handler: SnapshotHandlers<C, M, D>,
  options: { pause: Boolean } = { pause: false }
): () => void {
  const client = useRef<SocketClient<C, M, D> | null>(null);
  useEffect(() => {
    const socket = new SocketClient<C, M, D>(url);
    if (!options.pause) {
      socket.connect();
      socket.onMessage(handler);
    }
    client.current = socket;
    return () => {
      socket.wipe();
      client.current = null;
    };
  }, [url]);

  return () => {
    if (!client.current) return;
    client.current.wipe();
    client.current.connect();
    client.current.onMessage(handler);
  };
}

export function useSnapshotContext<
  C extends object,
  M extends object,
  D extends object
>(
  context: Context<SocketClient<C, M, D>>,
  handler: SnapshotHandlers<C, M, D>,
  options: { pause: Boolean } = { pause: false }
): () => void {
  const socket = useContext(context);
  useEffect(() => {
    if (!options.pause) {
      socket.onMessage(handler);
    }
    return () => {
      socket.wipe();
    };
  }, []);

  return () => {
    socket.wipe();
    socket.connect();
    socket.onMessage(handler);
  };
}
