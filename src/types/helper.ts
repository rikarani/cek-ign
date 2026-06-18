import type { TSchema, UnwrapSchema } from 'elysia';

type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T;

type DeepRequired<T> = {
  [K in keyof T]-?: Exclude<T[K], undefined> extends infer D ? (D extends object ? DeepRequired<D> : D) : never;
};

export type Query<T extends TSchema> = UnwrapSchema<T>;
export type Success<T extends TSchema> = Expand<DeepRequired<UnwrapSchema<T>>>;
