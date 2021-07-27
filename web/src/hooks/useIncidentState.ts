//
//  useIncidentState.ts
//  web
//
//  Created by d-exclaimation on 15:16.
//

import { useReducer } from "react";
import { useSnapshotInstance } from "../snapshot";
import { Incident, NewIncident, RIncident } from "./../models/Incident";

export function useIncidentState(url: string, initial: Incident[] = []) {
  const [state, dispatch] = useReducer(incidentReducer, initial);
  const reconnect = useSnapshotInstance<RIncident, RIncident, RIncident>(url, {
    creation: (x) => dispatch({ type: "create", payload: NewIncident(x) }),
    mutation: (x) => dispatch({ type: "update", payload: NewIncident(x) }),
    deletion: (x) => dispatch({ type: "delete", payload: NewIncident(x) }),
  });

  return {
    state,
    reconnect,
  };
}

type IncidentActions =
  | { type: "create"; payload: Incident }
  | { type: "update"; payload: Incident }
  | { type: "delete"; payload: Incident };

export function incidentReducer(
  state: Incident[],
  actions: IncidentActions
): Incident[] {
  switch (actions.type) {
    case "create":
      return [...state, actions.payload].sort((x, y) =>
        x.lastOccurred <= y.lastOccurred ? -1 : 1
      );
    case "update":
      return state.map((x) =>
        x.id == actions.payload.id ? actions.payload : x
      );
    case "delete":
      return state.filter((x) => x.id !== actions.payload.id);
    default:
      throw new Error("Illegal actions");
  }
}
