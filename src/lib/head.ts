export type Head<T> = T extends [infer Head, ...unknown[]] ? Head : never;
