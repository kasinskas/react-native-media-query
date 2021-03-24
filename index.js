import { useMediaQuery } from "./useMediaQuery";

const flush = () => {};

const StyleSheet = {
  create: (stylesWithQuery) => useMediaQuery(stylesWithQuery),
};

export { flush, useMediaQuery, StyleSheet };
export default StyleSheet;
