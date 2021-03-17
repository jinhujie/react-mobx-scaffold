export const prefix = (p, classes) => {
  return classes
    .split(" ")
    .map((className) => `${p}-${className}`)
    .join(" ");
};

export function indexToCn(index) {
  const numbericMap = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  if (typeof index !== "number") {
    console.error(
      `function indexToCn expected 'number', but got ${typeof index}`
    );
    return "";
  }
  const input = String(index);
  return input
    .split("")
    .map((i) => numbericMap[i])
    .join("");
}
