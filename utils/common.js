const isMedia = (query) => query.indexOf('@media') === 0;
const isPseudo = (query) => query.indexOf(':') === 0;
const isMediaOrPseudo = (query) =>  isMedia(query) || isPseudo(query)

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const createCssRule = (query, stringHash, css) => {
    let rule;
    const dataMediaSelector = `[data-media~="${stringHash}"]`;

      if (isMedia(query)) {
        rule = `${query} {${dataMediaSelector} ${css}}`;
      } else {
        rule = `${dataMediaSelector}${query} ${css}`;
      }
    
    return rule
}

export {isMedia, isPseudo, isMediaOrPseudo, deepClone, createCssRule}