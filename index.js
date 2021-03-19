const flush = () => {};
import { useMediaQuery } from './useMediaQuery';

const StyleSheet = {
    create: (stylesWithQuery, id) => useMediaQuery(stylesWithQuery, id )
}

export { flush, useMediaQuery, StyleSheet };
export default StyleSheet