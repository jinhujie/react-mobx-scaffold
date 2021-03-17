export const prefix = (p, classes) => {
  return classes
    .split(" ")
    .map((className) => `${p}-${className}`)
    .join(" ");
};
