type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T;

type DeepRequired<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined> extends infer D ? (D extends object ? DeepRequired<D> : D) : never;
};

export type Response<T> = Expand<DeepRequired<T>>;
