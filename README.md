# react-native-media-query
Adds support for media queries in react-native/react-native-web, triggers on device orientation changes and also works with next.js static generation or server-side rendering.
# Usage
```javascript
import { useMediaQuery } from 'react-native-media-query';

//note that StyleSheet.create shouldn't be used here
const styles = {
    example: {
        backgroundColor: 'green',
        '@media (max-width: 1600px)': {
            backgroundColor: 'red',
        },
        '@media (max-width: 800px)': {
            backgroundColor: 'blue',
        },
    }
}

const [ids, styles] = useMediaQuery('Component', styles);

...

// for react-native-web 0.13+
<Component style={styles.example} dataSet={{ media: ids.controlIcon }} />

// for older react-native-web
<Component style={styles.example} data-media={ids.controlIcon} />

```

# Next.js

## _document.js

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { flush as rnmq } from 'react-native-media-query';
import { AppRegistry } from 'react-native-web';

export default class CustomDocument extends Document {
    static async getInitialProps({ renderPage }) {
        AppRegistry.registerComponent('Main', () => Main);
        const { getStyleElement } = AppRegistry.getApplication('Main');
        const styles = [
            getStyleElement(),
            rnmq(),
        ];
        return { ...renderPage(), styles: React.Children.toArray(styles) };
    }

    render(){
        ...
    }
```