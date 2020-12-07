import { Dimensions } from 'react-native';
import mediaQuery from 'css-mediaquery';

const isMedia = (str) => str.indexOf('@media') === 0;
const isHover = (str) => str.indexOf(':hover') === 0;

const createStyle = (stylesWithQuery) => {
    let cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        Object.keys(stylesWithQuery[key])
            .filter((k) => isMedia(k) || isHover(k))
            .map((str) => {
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

export const useMediaQuery = (stylesWithQuery) => {
    const styles = createStyle(stylesWithQuery);
    return [{}, styles];
};
