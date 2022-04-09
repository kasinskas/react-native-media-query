import mediaQuery from "css-mediaquery";
import { Dimensions } from "react-native";
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
        const { width, height } = Dimensions.get("window");

        const isMatchingMediaQuery = mediaQuery.match(mqStr, {
          width,
          height,
          orientation: width > height ? "landscape" : "portrait",
          "aspect-ratio": width / height,
        });

        if (isMatchingMediaQuery) {
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
