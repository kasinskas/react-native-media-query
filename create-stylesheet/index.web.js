import { addCss } from "../utils/inject";
import createDeclarationBlock from "../utils/create-declaration-block";
import hash from "../hash";
import { isMediaOrPseudo, deepClone, createCssRule } from "../utils/common";

const createStyleSheet = (stylesWithQuery) => {
  if (!stylesWithQuery) return { ids: {}, styles: {}, fullStyles: {} };

  let ids = {};
  const cleanStyles = deepClone(stylesWithQuery);

  Object.keys(stylesWithQuery).map((key) => {
    if (!stylesWithQuery?.[key]) return;

    const mediaQueriesAndPseudoClasses = Object.keys(
      stylesWithQuery[key]
    ).filter(isMediaOrPseudo);

    mediaQueriesAndPseudoClasses.map((query) => {
      const css = createDeclarationBlock(stylesWithQuery[key][query]);
      const stringHash = `rnmq-${hash(`${key}${query}${css}`)}`;
      const rule = createCssRule(query, stringHash, css);

      addCss(`${stringHash}`, rule);
      delete cleanStyles[key][query];

      ids = {
        ...ids,
        [key]: `${ids?.[key] ? ids[key] + " " : ""}${stringHash}`,
      };
    });
  });
  
  return { ids, styles: cleanStyles, fullStyles: stylesWithQuery };
};

export default createStyleSheet;
