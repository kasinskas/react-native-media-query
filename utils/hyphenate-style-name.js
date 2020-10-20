/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

const toHyphenLower = (match) => '-' + match.toLowerCase();

const hyphenateStyleName = (name) => {
    if (cache.hasOwnProperty(name)) {
        return cache[name];
    }

    var hName = name.replace(uppercasePattern, toHyphenLower);
    return (cache[name] = msPattern.test(hName) ? '-' + hName : hName);
};

export default hyphenateStyleName;
