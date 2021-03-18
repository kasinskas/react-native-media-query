import { Dimensions } from 'react-native';
import mediaQuery from 'css-mediaquery';
import {isHover, isMedia, filterQueriesFromStyles} from '../utils/common'

const createStyle = (_, stylesWithQuery) => {
    let cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        const queries = filterQueriesFromStyles(stylesWithQuery[key])

        queries.map((str) => {
                if (isMedia(str)) {
                    const mqStr = str.replace('@media', '');
                    const isMatch = mediaQuery.match(mqStr, {
                        width: Dimensions.get('window').width,
                    });
                    if (isMatch) {
                        cleanStyles = {
                            ...cleanStyles,
                            [key]: { ...cleanStyles[key], ...stylesWithQuery[key][str] },
                        };
                    }
                }

                delete cleanStyles[key][str];
            });
    });
    return cleanStyles;
};

export const useMediaQuery = (_, stylesWithQuery) => {
    const styles = createStyle(_, stylesWithQuery);
    return [{}, styles];
};
