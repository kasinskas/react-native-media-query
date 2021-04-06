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


Triggers on device orientation changes and also works with next.js static generation or server-side rendering. Since `react-native-media-query` creates css based media queries on web, it allows you to easily avoid flash of unstyled (or incorrectly styled) content on initial load.

`:hover` and other pseudo classes should also work on web and other web based platforms, such as tizen, webOS and more. 
# Installation

`yarn add react-native-media-query`
or
`npm install react-native-media-query --save`
# Usage
```javascript
import StyleSheet from 'react-native-media-query';

const {ids, styles} = StyleSheet.create({
    example: {
        backgroundColor: 'green',
        '@media (max-width: 1600px) and (min-width: 800px)': {
            backgroundColor: 'red',
        },
        '@media (max-width: 800px)': {
            backgroundColor: 'blue',
        },
    }
})

...

// for react-native-web 0.13+
<Component style={styles.example} dataSet={{ media: ids.example }} />

// for older react-native-web
<Component style={styles.example} data-media={ids.example} />

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