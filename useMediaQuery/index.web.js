import { setRule } from '../inject';
import createDeclarationBlock from '../utils/create-declaration-block';
import stringHash from "string-hash"

const isMedia = (str) => str.indexOf('@media') === 0;
const isHover = (str) => str.indexOf(':hover') === 0;

const createStyle = (stylesWithQuery) => {
    let ids = {};

    const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        Object.keys(stylesWithQuery[key])
            .filter((k) => isMedia(k) || isHover(k))
            .map((query) => {
                const css = createDeclarationBlock(stylesWithQuery[key][query]);
                let str;
                const hash = `rnmq-${stringHash(`${key}${query}${css}`)}`
                if (isMedia(query)) {
                    str = `${query} {[data-media~="${hash}"] ${css}}`;
                }
                if (isHover(query)) {
                    str = `[data-media~="${hash}"]${query} ${css}`;
                }
                ids = { ...ids, [key]: hash };

                setRule(`${hash}`, str);
                delete cleanStyles[key][query];
            });
    });
    return { ids, cleanStyles };
};

export const useMediaQuery = (stylesWithQuery) => {
    const { ids, cleanStyles } = createStyle(stylesWithQuery);
    return [ids, cleanStyles];
};
