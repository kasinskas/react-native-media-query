import createStyle from "./create-style";
import { flush } from "./utils/inject";

const StyleSheet = {
  create: createStyle
};

export { flush, useMediaQuery, StyleSheet };
export default StyleSheet;
