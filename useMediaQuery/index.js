import { Dimensions } from "react-native";
import mediaQuery from "css-mediaquery";
import { isMedia, filterQueriesFromStyles } from "../utils/common";

const createStyle = (stylesWithQuery = {}) => {
  let cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));

  Object.keys(stylesWithQuery).map((key) => {
    if (!stylesWithQuery?.[key]) {
      return;
    }

    const queries = filterQueriesFromStyles(stylesWithQuery[key]);

    queries.map((str) => {
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
  return { cleanStyles, fullStyles: stylesWithQuery };
};

export const useMediaQuery = (stylesWithQuery) => {
  const { cleanStyles, fullStyles } = createStyle(stylesWithQuery);
  return { ids: {}, styles: cleanStyles, fullStyles };
};
