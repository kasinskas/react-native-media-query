import { DetailedReactHTMLElement } from "react";
import "react-native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

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

// Prop dataSet not available in typescript: https://github.com/necolas/react-native-web/issues/1668
// Workaround fix implemented from: https://github.com/necolas/react-native-web/issues/1684#issuecomment-712297248
declare module "react-native" {
  interface ViewProps {
    dataSet?: Record<string, string>;
  }

  interface TextProps {
    dataSet?: Record<string, string>;
  }

  interface ImageProps {
    dataSet?: Record<string, string>;
  }
}
