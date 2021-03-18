import { setRule } from '../inject';
import createDeclarationBlock from '../utils/create-declaration-block';

const isMedia = (str) => str.indexOf('@media') === 0;
const isHover = (str) => str.indexOf(':hover') === 0;

const createStyle = (id, stylesWithQuery) => {
    let ids = {};

    const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        const identifier = `${id}-${key}`;

        Object.keys(stylesWithQuery[key])
            .filter((k) => isMedia(k) || isHover(k))
            .map((query) => {
                const css = createDeclarationBlock(stylesWithQuery[key][query]);
                ids = { ...ids, [key]: identifier };
                let str;
                if (isMedia(query)) {
                    str = `${query} {[data-media~="${identifier}"] ${css}}`;
                }
                if (isHover(query)) {
                    str = `[data-media~="${identifier}"]${query} ${css}`;
                }

                setRule(`${identifier}`, str);
                delete cleanStyles[key][query];
            });
    });
    return { ids, cleanStyles };
};

export const useMediaQuery = (id, stylesWithQuery) => {
    const { ids, cleanStyles } = createStyle(id, stylesWithQuery);
    return [ids, cleanStyles];
};
