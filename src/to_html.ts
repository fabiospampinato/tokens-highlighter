
/* IMPORT */

import {BACKGROUND_COLOR, CLASS, NEWLINE} from './constants';
import {escapeHTML} from './utils';
import type {Options, Token} from './types';

/* MAIN */

const toHTML = ( tokens: Token[][], options?: Options ): string => {

  const backgroundColor = `background-color:${options?.backgroundColor || BACKGROUND_COLOR}`;

  let output = `<pre class="${CLASS}" style="${backgroundColor}">`;

  for ( let li = 0, ll = tokens.length; li < ll; li++ ) {

    const lineTokens = tokens[li];

    for ( let ti = 0, tl = lineTokens.length; ti < tl; ti++ ) {

      const token = lineTokens[ti];

      if ( !token.value ) continue;

      const color = token.color ? `color:${token.color}` : '';
      const backgroundColor = token.backgroundColor ? `;background-color:${token.backgroundColor}` : '';
      const fontStyle = token.fontStyle ? `;font-style:${token.fontStyle}` : '';
      const fontWeight = token.fontWeight ? `;font-weight:${token.fontWeight}` : '';
      const textDecoration = token.textDecoration ? `;text-decoration:${token.textDecoration}` : '';
      const value = escapeHTML ( token.value );

      output += `<span style="${color}${backgroundColor}${fontStyle}${fontWeight}${textDecoration}">${value}</span>`;

    }

    if ( li < ll - 1 ) {

      output += NEWLINE;

    }

  }

  output += '</pre>';

  return output;

};

/* EXPORT */

export default toHTML;
