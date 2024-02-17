
/* IMPORT */

import {toKebabCase} from 'kasi';

/* MAIN */

const escapeHTML = (() => {

  const replacementsRe = /[&<>"]/g;
  const replacements: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  const replaceChar = ( char: string ): string => {
    return replacements[char];
  };

  const replaceChars = ( str: string ): string => {
    return str.replace ( replacementsRe, replaceChar );
  };

  return replaceChars;

})();

const memoize = <Args extends unknown[], Return> ( fn: ( ...args: Args ) => Return ): (( ...args: Args ) => Return) => {

  const cache = new Map ();

  return ( ...args: Args ): Return => {

    const id = args[0];
    const resultCached = cache.get ( id );

    if ( resultCached !== undefined || cache.has ( id ) ) return resultCached;

    const result = fn.apply ( undefined, args );

    cache.set ( id, result );

    return result;

  };

};

/* EXPORT */

export {escapeHTML, memoize, toKebabCase};
