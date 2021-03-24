import { useMediaQuery } from "./useMediaQuery";
import { flush } from "./utils/inject";

const StyleSheet = {
  create: (id, stylesWithQuery) => useMediaQuery(id, stylesWithQuery),
};

export { flush, useMediaQuery, StyleSheet };
export default StyleSheet;
