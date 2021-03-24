const isMedia = (query) => query.indexOf('@media') === 0;
const isPseudo = (query) => query.indexOf(':') === 0;

export {isMedia, isPseudo}