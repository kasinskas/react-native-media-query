import { addCss } from "../utils/inject";
import createDeclarationBlock from "../utils/create-declaration-block";
import hash from "../hash";
import { isMedia, filterQueriesFromStyles } from "../utils/common";

const createStyle = (stylesWithQuery) => {
  let ids = {};
  const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));

  Object.keys(stylesWithQuery).map((key) => {
    if (!stylesWithQuery?.[key]) {
      return;
    }

    const queries = filterQueriesFromStyles(stylesWithQuery[key]);

    queries.map((query) => {
      const css = createDeclarationBlock(stylesWithQuery[key][query]);
      const stringHash = `rnmq-${hash(`${key}${query}${css}`)}`;
      const dataMediaSelector = `[data-media~="${stringHash}"]`;

      ids = {
        ...ids,
        [key]: `${ids?.[key] ? ids[key] + " " : ""}${stringHash}`,
      };
      let str;
      if (isMedia(query)) {
        str = `${query} {${dataMediaSelector} ${css}}`;
      } else {
        str = `${dataMediaSelector}${query} ${css}`;
      }

      addCss(`${stringHash}`, str);
      delete cleanStyles[key][query];
    });
  });
  return { ids, cleanStyles, fullStyles: stylesWithQuery };
};

export const useMediaQuery = (stylesWithQuery) => {
  const { ids, cleanStyles, fullStyles } = createStyle(stylesWithQuery);
  return { ids, styles: cleanStyles, fullStyles };
};
