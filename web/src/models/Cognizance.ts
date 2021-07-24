//
//  Cognizance.ts
//  web
//
//  Created by d-exclaimation on 22:53.
//

export type Cognizance = {
  validation: boolean;
  timestamp: string;
};

export function Cognizance(json: string): boolean {
  const c: Cognizance = JSON.parse(json);
  console.log(new Date(c.timestamp));
  return c.validation;
}
