//
//  Snapshot.ts
//  web
//
//  Created by d-exclaimation on 22:46.
//

export type Snapshot<
  TCreation extends object,
  TMutation extends object,
  TDeletion extends object
> =
  | { operation: "creation"; payload: TCreation }
  | { operation: "deletion"; payload: TDeletion }
  | { operation: "mutation"; payload: TMutation };

export function Snapshot<
  TCreation extends object,
  TMutation extends object,
  TDeletion extends object
>(json: string): Snapshot<TCreation, TMutation, TDeletion> {
  return JSON.parse(json);
}

export function handleEvent<
  TCreation extends object,
  TMutation extends object,
  TDeletion extends object
>(
  snap: Snapshot<TCreation, TMutation, TDeletion>,
  handler: SnapshotHandlers<TCreation, TMutation, TDeletion> = defaultHandler
): void {
  switch (snap.operation) {
    case "creation":
      return handler.creation(snap.payload);
    case "mutation":
      return handler.mutation(snap.payload);
    case "deletion":
      return handler.deletion(snap.payload);
    default:
      throw new Error("Wtf");
  }
}

export type SnapshotHandlers<
  TCreation extends object,
  TMutation extends object,
  TDeletion extends object
> = {
  creation: (payload: TCreation) => void;
  mutation: (payload: TMutation) => void;
  deletion: (payload: TDeletion) => void;
};

const defaultHandler: SnapshotHandlers<any, any, any> = {
  creation: () => {},
  mutation: () => {},
  deletion: () => {},
};
