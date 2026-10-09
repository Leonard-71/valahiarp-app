export const createNestedObject = (path: string, value: any): object => {
  return path.split(".").reduceRight((acc, part) => ({ [part]: acc }), value);
};
