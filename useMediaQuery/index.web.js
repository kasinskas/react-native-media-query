import { setRule } from '../utils/inject';
import createDeclarationBlock from '../utils/create-declaration-block';
import {isHover, isMedia, filterQueriesFromStyles} from '../utils/common'

const createStyle =  (stylesWithQuery = {}, id = "") => {
    let ids = {};
    const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        if (!stylesWithQuery?.[key]) {
            return
        }

        const identifier = `${id}-${key}`;
        const dataMediaSelector = `[data-media~="${identifier}"]`
        const queries = filterQueriesFromStyles(stylesWithQuery[key])

        queries.map((query) => {
            if (id){
                const css = createDeclarationBlock(stylesWithQuery[key][query]);
                ids = { ...ids, [key]: identifier };
                let str;
                if (isMedia(query)) {
                    str = `${query} {${dataMediaSelector} ${css}}`;
                }
                if (isHover(query)) {
                    str = `${dataMediaSelector}${query} ${css}`;
                }

                setRule(`${identifier}`, str);}
                delete cleanStyles[key][query];
            });
    });
    return { ids, cleanStyles, fullStyles: stylesWithQuery };
};

export const useMediaQuery = (stylesWithQuery, id) => {
    const { ids, cleanStyles, fullStyles } = createStyle(stylesWithQuery, id);
    return { ids, styles: cleanStyles, fullStyles };
};
