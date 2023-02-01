import { DetailedReactHTMLElement } from "react";
import "react-native";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type StyleProperty =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | { [k: string]: ViewStyle | TextStyle | ImageStyle };

export type NamedStyles<T> = {
  [P in keyof T]: StyleProperty;
};

type BaseStyle<UserStyles> = {
  [Element in keyof UserStyles]: {
    [Property in keyof UserStyles[Element] as Property extends
      | `@media${string}`
      | `:${string}`
      ? never
      : Property]: UserStyles[Element][Property];
  };
};

type ResponsiveStyle<UserStyles> = {
  [Element in keyof UserStyles]: {
    [P in {
      [Property in keyof UserStyles[Element]]: Property extends
        | `@media${string}`
        | `:${string}`
        ? {
            [QueryProperty in keyof UserStyles[Element][Property]]: [
              QueryProperty,
              UserStyles[Element][Property][QueryProperty]
            ];
          }[keyof UserStyles[Element][Property]]
        : never;
    }[keyof UserStyles[Element]] as P[0]]?: P[1];
  };
};

type ComputedStyle<UserStyles> = BaseStyle<UserStyles> &
  ResponsiveStyle<UserStyles>;

export declare function create<
  UserStyles extends NamedStyles<UserStyles> | NamedStyles<any>
>(
  styles: UserStyles | NamedStyles<UserStyles>
): {
  fullStyles: UserStyles;
  ids: Record<keyof UserStyles, string>;
  styles: ComputedStyle<UserStyles>;
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
