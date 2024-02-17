
/* IMPORT */

import {BACKGROUND_COLOR, CLASS, NEWLINE} from './constants';
import type {Options, Token} from './types';

/* MAIN */

const toDOM = ( tokens: Token[][], options?: Options ): HTMLPreElement => {

  const output = document.createElement ( 'pre' );

  output.classList.add ( CLASS );
  output.style.backgroundColor = options?.backgroundColor || BACKGROUND_COLOR;

  for ( let li = 0, ll = tokens.length; li < ll; li++ ) {

    const lineTokens = tokens[li];

    for ( let ti = 0, tl = lineTokens.length; ti < tl; ti++ ) {

      const token = lineTokens[ti];

      if ( !token.value ) continue;

      const node = document.createElement ( 'span' );

      node.innerText = token.value;

      if ( token.color ) node.style.color = token.color;
      if ( token.backgroundColor ) node.style.backgroundColor = token.backgroundColor;
      if ( token.fontStyle ) node.style.fontStyle = token.fontStyle;
      if ( token.fontWeight ) node.style.fontWeight = token.fontWeight;
      if ( token.textDecoration ) node.style.textDecoration = token.textDecoration;

      output.appendChild ( node );

    }

    if ( li < ll - 1 ) {

      output.appendChild ( document.createTextNode ( NEWLINE ) );

    }

  }

  return output;

};

/* EXPORT */

export default toDOM;
