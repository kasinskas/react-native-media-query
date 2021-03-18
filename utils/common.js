const isMedia = (query) => query.indexOf('@media') === 0;
const isHover = (query) => query.indexOf(':hover') === 0;
const filterQueriesFromStyles = (styles) => Object.keys(styles).filter((k) => isMedia(k) || isHover(k))

export {isMedia, isHover, filterQueriesFromStyles}