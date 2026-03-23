type Defined<T> = Exclude<T, undefined>;

type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T;

type DeepRequired<T> = {
  [K in keyof T]-?: Defined<T[K]> extends infer D ? (D extends object ? DeepRequired<D> : D) : never;
};

export type Response<T> = Expand<DeepRequired<T>>;
