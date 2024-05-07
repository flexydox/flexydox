export const concatStrings = (
  joinChar: string,
  ...strings: (string | null | undefined)[]
): string => {
  const cleanStrings = (strings || []).filter((s) => s);
  return cleanStrings.join(joinChar);
};
