import createReactDOMStyle from "react-native-web/dist/exports/StyleSheet/compiler/createReactDOMStyle";
import prefixStyles from "react-native-web/dist/modules/prefixStyles";
import hyphenateStyleName from "./hyphenate-style-name";

const createDeclarationBlock = (style) => {
  const domStyle = prefixStyles(createReactDOMStyle(style));
  const declarationsString = Object.keys(domStyle)
    .map((property) => {
      const value = domStyle[property];
      const prop = hyphenateStyleName(property);
      if (Array.isArray(value)) {
        return value.map((v) => `${prop}:${v}`).join(";");
      } else {
        return `${prop}:${value} !important`;
      }
    })
    .sort()
    .join(";");
  return `{${declarationsString};}`;
};

export default createDeclarationBlock;
