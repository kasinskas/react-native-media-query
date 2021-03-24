import { addCss } from "../utils/inject";
import createDeclarationBlock from "../utils/create-declaration-block";
import hash from "../hash";
import { isMedia, isPseudo } from "../utils/common";

const createStyle = (stylesWithQuery) => {
  let ids = {};
  const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));

  Object.keys(stylesWithQuery).map((key) => {
    if (!stylesWithQuery?.[key]) {
      return;
    }

    const mediaQueriesAndPseudoClasses = Object.keys(stylesWithQuery[key]).filter((k) => isMedia(k) || isPseudo(k))

    mediaQueriesAndPseudoClasses.map((query) => {
      let rule;
      const css = createDeclarationBlock(stylesWithQuery[key][query]);
      const stringHash = `rnmq-${hash(`${key}${query}${css}`)}`;
      const dataMediaSelector = `[data-media~="${stringHash}"]`;

      ids = {
        ...ids,
        [key]: `${ids?.[key] ? ids[key] + " " : ""}${stringHash}`,
      };
      
      if (isMedia(query)) {
        rule = `${query} {${dataMediaSelector} ${css}}`;
      } else {
        rule = `${dataMediaSelector}${query} ${css}`;
      }

      addCss(`${stringHash}`, rule);
      delete cleanStyles[key][query];
    });
  });
  return { ids, styles: cleanStyles, fullStyles: stylesWithQuery };
};

export default createStyle;
