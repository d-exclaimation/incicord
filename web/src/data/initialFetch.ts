//
//  initialFetch.ts
//  web
//
//  Created by d-exclaimation on 16:27.
//
import { uri, ver } from "./../constants/uri";
import { Data } from "./../models/Data";
import { RIncident } from "./../models/Incident";

export const initialFetch = async (
  limit: number = 10
): Promise<Data<RIncident[]>> => {
  try {
    const resp = await fetch(`${uri}/${ver}/incidents/all?limit=${limit}`, {
      method: "GET",
      credentials: "include",
      cache: "default",
    });
    const res: Data<RIncident[]> = await resp.json();

    return res;
  } catch (e) {
    console.error(e);
    return {
      data: null,
      errors: ["API call failed"],
    };
  }
};
