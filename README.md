<h1 align="center">
    react-native-media-query
</h1>

<p align="center">
  <strong>Write once, use anywhere:</strong><br>
  Media queries for react-native and react-native-web
</p>

<p align="center">
    <a href="https://www.npmjs.org/package/react-native-media-query">
        <img src="https://img.shields.io/npm/v/react-native-media-query?color=brightgreen&label=npm%20package" alt="Current npm package version." />
    </a>
</p>

Adds support for media queries in react-native and react-native-web, which allows you to reuse styles between different platforms and form-factors, such as web, smart tvs, mobiles, tablets and native tvs.


This package also works with next.js static generation or server-side rendering. Since `react-native-media-query` creates css based media queries on web, it allows you to easily avoid flash of unstyled (or incorrectly styled) content on initial load.

`:hover` and other pseudo classes should also work on web and other web based platforms, such as tizen, webOS and more. 

To trigger media queries on device orientation changes for native platforms, for now you will most likely need to update the state, because `react-native-media-query` has no listeners inside. Simple `useWindowDimensions` from `react-native`, or similar should work. 
# Installation

`yarn add react-native-media-query`
or
`npm install react-native-media-query --save`
# Usage
```javascript
import StyleSheet from 'react-native-media-query';
import { View, TextInput } from 'react-native'

const {ids, styles} = StyleSheet.create({
    example: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
        '@media (max-width: 1600px) and (min-width: 800px)': {
            backgroundColor: 'red',
        },
        '@media (max-width: 800px)': {
            backgroundColor: 'blue',
        },
    },
    exampleTextInput: {
        paddingVertical: 27,
        backgroundColor: 'pink',
        '@media (max-width: 768px)': {
            paddingVertical: 13,
        },
        // example CSS selectors. these only work on web based platforms
        '::placeholder': {
            color: 'green',
        },
        ':hover': {
            backgroundColor: 'red',
        },
    }
})

...

// dataSet is only required for web
// for react-native-web 0.13+
<View style={styles.example} dataSet={{ media: ids.example }} />
<TextInput
    style={styles.exampleTextInput}
    dataSet={{ media: ids.exampleTextInput }}
    placeholder="Search"
    ...
/>


// for older react-native-web
<View style={styles.example} data-media={ids.example} />
// or if you want to use HTML tags for web only, it will also work
<div style={styles.example} data-media={ids.example} />




```

# react-native-web with next.js

Update your custom document (`pages/_document.js)` like in example below. Further usage is exactly the same as shown above.

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { flush } from 'react-native-media-query';
import { AppRegistry } from 'react-native-web';

export default class CustomDocument extends Document {
    static async getInitialProps({ renderPage }) {
        AppRegistry.registerComponent('Main', () => Main);
        const { getStyleElement } = AppRegistry.getApplication('Main');
        const { html, head } = renderPage();

        const styles = [ getStyleElement(), flush() ];
        return { html, head, styles: React.Children.toArray(styles) };
    }

    render(){
        ...
    }
```
