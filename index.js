import createStyle from "./create-style";

const flush = () => {};

const StyleSheet = {
  create: createStyle,
};

export { flush, useMediaQuery, StyleSheet };
export default StyleSheet;
