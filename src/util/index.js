export const prefix = (p, classes) => {
  return classes
    .split(" ")
    .map((className) => `${p}-${className}`)
    .join(" ");
};

/**
 *
 * @param {n} :int && n > 0
 * @returns cn number
 */
export function indexToCn(n) {
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const positions = [
    "",
    "十",
    "百",
    "千",
    "万",
    "十万",
    "百万",
    "千万",
    "亿",
    "十亿",
    "百亿",
    "千亿",
  ];
  const charArray = String(n).split("");
  let result = "";
  let prevIsZero = false;
  //处理0  deal zero
  for (let i = 0; i < charArray.length; i++) {
    const ch = charArray[i];
    if (ch !== "0" && !prevIsZero) {
      result += digits[parseInt(ch)] + positions[charArray.length - i - 1];
    } else if (ch === "0") {
      prevIsZero = true;
    } else if (ch !== "0" && prevIsZero) {
      result +=
        "零" + digits[parseInt(ch)] + positions[charArray.length - i - 1];
    }
  }
  //处理十 deal ten
  if (n < 100) {
    result = result.replace("一十", "十");
  }
  return result;
}
