import { DetailedReactHTMLElement } from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

declare function create<
  UserStyles extends NamedStyles<UserStyles> | NamedStyles<any>
>(
  styles: UserStyles | NamedStyles<UserStyles>
): {
  styles: UserStyles;
  fullStyles: UserStyles;
  ids: Record<keyof UserStyles, string>;
};

declare function process<
  UserStyles extends NamedStyles<UserStyles> | NamedStyles<any>
>(
  styles: UserStyles | NamedStyles<UserStyles>
): {
  styles: UserStyles;
  fullStyles: UserStyles;
  ids: string;
};

export function flush(): DetailedReactHTMLElement<
  {
    id: string;
    key: string;
    dangerouslySetInnerHTML: {
      __html: string;
    };
  },
  HTMLElement
>;

export default {
  create,
  process,
};
