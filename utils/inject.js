import React from "react";
import { createCompareFn, MOBILE_FIRST } from "./sort-css-media-queries";
const compareFn = createCompareFn(MOBILE_FIRST);

const findSortedIdx = (arr, item) => {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = (start + end) >> 1;
    const result = compareFn(item, arr[mid].cssText);

    if (result === 0) {
      return mid;
    } else if (result < 0) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }

  return end;
};

const rules = {};
let styleSheet;

if (typeof window !== "undefined") {
  styleSheet = (() => {
    const style = document.createElement("style");
    style.id = "RNMQCSS";
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  })();
}

export const hasCss = (id, text) =>
  !!rules[id] && !!rules[id].text?.includes?.(text);

export const addCss = (id, text) => {
  if (!hasCss(id, text)) {
    rules[id] = rules?.[id] || {};
    rules[id].text = (rules[id]?.text || "") + text;

    if (styleSheet) {
      const index = findSortedIdx([...styleSheet.cssRules], text);
      styleSheet.insertRule(text, index);
    }
  }
};

export const flush = () =>
  React.createElement("style", {
    id: "rnmq",
    key: "rnmq",
    dangerouslySetInnerHTML: {
      __html: Object.keys(rules)
        .map((key) => rules[key].text)
        .sort(compareFn)
        .join("\n"),
    },
  });
