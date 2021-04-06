import { Dimensions } from "react-native";
import mediaQuery from "css-mediaquery";
import { isMedia, isMediaOrPseudo } from "../utils/common";

const createStyleSheet = (stylesWithQuery = {}) => {
  if (!stylesWithQuery) return { ids: {}, styles: {}, fullStyles: {} };

  let cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));

  Object.keys(stylesWithQuery).map((key) => {
    if (!stylesWithQuery?.[key]) {
      return;
    }

    const mediaQueriesAndPseudoClasses = Object.keys(
      stylesWithQuery[key]
    ).filter(isMediaOrPseudo);

    mediaQueriesAndPseudoClasses.map((str) => {
      if (isMedia(str)) {
        const mqStr = str.replace("@media", "");
        const isWidthMatchingMediaQuery = mediaQuery.match(mqStr, {
          width: Dimensions.get("window").width,
        });

        if (isWidthMatchingMediaQuery) {
          cleanStyles = {
            ...cleanStyles,
            [key]: { ...cleanStyles[key], ...stylesWithQuery[key][str] },
          };
        }
      }

      delete cleanStyles[key][str];
    });
  });
  return { ids: {}, styles: cleanStyles, fullStyles: stylesWithQuery };
};

export default createStyleSheet;
