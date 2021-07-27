//
//  Data.ts
//  web
//
//  Created by d-exclaimation on 16:35.
//

export type Data<T> =
  | { data: T; errors: null }
  | { data: null; errors: string[] };
