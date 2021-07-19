import React from "react";

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
      styleSheet.insertRule(text, (Object.keys(rules).length-1));
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
        .join("\n"),
    },
  });
