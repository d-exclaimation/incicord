//
//  Incident.ts
//  incicord
//
//  Created by d-exclaimation on 21:16.
//

export type Incident = {
  id: number;
  name: string;
  lastOccurred: Date;
  severity: IncidentSeverity;
  info: IncidentInfo;
};

export type IncidentInfo = {
  relativeDate: string;
  streakColor: string;
};

export type RIncident = Omit<Incident, "lastOccurred"> & {
  lastOccurred: string;
};

export type IncidentDTO = {
  name: string;
  lastOccurred: string;
  severity: IncidentSeverity;
};

export type IncidentSeverity = "none" | "calm" | "mild" | "severe";

type IncidentDTOOptions = Omit<IncidentDTO, "lastOccurred"> & {
  lastOccurred: Date;
};

export const NewIncident = (json: RIncident): Incident => ({
  ...json,
  lastOccurred: new Date(json.lastOccurred),
});

export const createIncident = (val: IncidentDTOOptions): IncidentDTO => ({
  ...val,
  lastOccurred: val.lastOccurred.toISOString(),
});
