import { Prisma } from "@/generated/prisma";

type Primitive =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | Prisma.Decimal;

export type LeafPaths<T, P extends string = ""> = {
  [K in keyof T]-?: K extends string
    ? NonNullable<T[K]> extends Primitive
      ? `${P extends "" ? "" : `${P}.`}${K}`
      : NonNullable<T[K]> extends (infer U)[]
        ? LeafPaths<U, `${P extends "" ? "" : `${P}.`}${K}.some`>
        : NonNullable<T[K]> extends object
          ? LeafPaths<T[K] & {}, `${P extends "" ? "" : `${P}.`}${K}`>
          : never
    : never;
}[keyof T];
