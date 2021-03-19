import { useMediaQuery } from './useMediaQuery';
import { flush } from './utils/inject';

const StyleSheet = {
    create: (stylesWithQuery, id) => useMediaQuery(stylesWithQuery, id )
}

export { flush, useMediaQuery, StyleSheet }
export default StyleSheet