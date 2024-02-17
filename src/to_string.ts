
/* IMPORT */

import {NEWLINE} from './constants';
import type {Token} from './types';

/* MAIN */

const toString = ( tokens: Token[][] ): string => {

  let output = '';

  for ( let li = 0, ll = tokens.length; li < ll; li++ ) {

    const lineTokens = tokens[li];

    for ( let ti = 0, tl = lineTokens.length; ti < tl; ti++ ) {

      output += lineTokens[ti].value;

    }

    if ( li < ll - 1 ) {

      output += NEWLINE;

    }

  }

  return output;

};

/* EXPORT */

export default toString;
