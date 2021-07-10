//
//  isServer.ts
//  incicord
//
//  Created by d-exclaimation on 13:02.
//

export const isServer = () => typeof window === "undefined";
export const isClient = () => typeof window !== "undefined";
