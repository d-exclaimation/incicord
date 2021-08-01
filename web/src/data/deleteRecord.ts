//
//  deleteRecord.ts
//  web
//
//  Created by d-exclaimation on 15:25.
//

import { uri, ver } from "../constants/uri";
import { Data } from "../models/Data";
import { RIncident } from "../models/Incident";

export const deleteRecord = async (id: number) => {
  try {
    const resp = await fetch(`${uri}/${ver}/incidents/delete?id=${id}`, {
      method: "DELETE",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const res: Data<RIncident> = await resp.json();
    return res;
  } catch (e) {
    console.error(e);
    return {
      data: null,
      errors: ["API call failed", `${e}`],
    };
  }
};
