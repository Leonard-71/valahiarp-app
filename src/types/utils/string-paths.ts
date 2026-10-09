export type StringPaths<T, P extends string = ""> = {
  [K in keyof T]-?: K extends string
    ? string extends NonNullable<T[K]>
      ? `${P extends "" ? "" : `${P}.`}${K}`
      : NonNullable<T[K]> extends (infer U)[]
        ? StringPaths<U, `${P extends "" ? "" : `${P}.`}${K}.some`>
        : NonNullable<T[K]> extends object
          ? StringPaths<NonNullable<T[K]>, `${P extends "" ? "" : `${P}.`}${K}`>
          : never
    : never;
}[keyof T];
