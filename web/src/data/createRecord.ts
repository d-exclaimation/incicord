//
//  createRecord.ts
//  web
//
//  Created by d-exclaimation on 16:27.
//
import { uri, ver } from "./../constants/uri";
import { Data } from "./../models/Data";
import { IncidentDTO, RIncident } from "./../models/Incident";

export const createRecord = async (
  record: IncidentDTO
): Promise<Data<RIncident>> => {
  try {
    const resp = await fetch(`${uri}/${ver}/incidents/create`, {
      method: "POST",
      headers: {
        "Context-Type": "application/json",
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify(record),
    });
    return await resp.json();
  } catch (e) {
    return {
      data: null,
      errors: ["Failed to perform request"],
    };
  }
};
