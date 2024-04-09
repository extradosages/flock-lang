export type Tail<T> = T extends [unknown, ...infer Tail] ? Tail : never;
