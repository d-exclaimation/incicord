//
//  uri.ts
//  web
//
//  Created by d-exclaimation on 16:28.
//

export const uri =
  process.env.NEXT_PUBLIC_URL || process.env.URL || "http://localhost:4000";

export const ver =
  process.env.NEXT_PUBLIC_VERSION || process.env.VERSION || "v1";

export const ws =
  process.env.NEXT_PUBLIC_WS ||
  process.env.WS ||
  `ws://localhost:4000/${ver}/updates`;
