//
//  Incident.ts
//  incicord
//
//  Created by d-exclaimation on 21:16.
//

export type Incident = {};

export type IncidentDTO = {
  name: string;
  last_occurred: string;
  by: User;
  severity: IncidentSeverity;
};

export type IncidentSeverity = "none" | "calm" | "mild" | "severe";

type User = {
  name: string;
  streak: number;
};

type IncidentDTOOptions = Omit<Omit<IncidentDTO, "last_occurred">, "by"> & {
  last_occurred: Date;
  by?: User;
};

export const createIncident = (val: IncidentDTOOptions): IncidentDTO => ({
  ...val,
  last_occurred: val.last_occurred.toISOString(),
  by: val.by || { name: "Anonymouse", streak: 0 },
});
