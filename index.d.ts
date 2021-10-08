import { DetailedReactHTMLElement } from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export declare function create<
  UserStyles extends NamedStyles<UserStyles> | NamedStyles<any>
>(
  styles: UserStyles | NamedStyles<UserStyles>
): {
  styles: UserStyles;
  fullStyles: UserStyles;
  ids: Record<keyof UserStyles, string>;
};

export declare function process<
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
