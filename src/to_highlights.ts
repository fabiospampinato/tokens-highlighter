
/* IMPORT */

import {BACKGROUND_COLOR, CLASS, NEWLINE} from './constants';
import Highlights from './highlights';
import toString from './to_string';
import type {Disposer, Options, Token} from './types';

/* MAIN */

const toHighlights = ( tokens: Token[][], options?: Options ): [HTMLPreElement, Disposer] => {

  const output = document.createElement ( 'pre' );

  output.classList.add ( CLASS );
  output.style.backgroundColor = options?.backgroundColor || BACKGROUND_COLOR;

  const string = toString ( tokens );
  const text = document.createTextNode ( string );

  output.appendChild ( text );

  if ( !Highlights.isSupported () ) return [output, () => {}]; // Not supported, bailing out

  const disposers: Disposer[] = [];
  const dispose = () => disposers.forEach ( dispose => dispose () );

  for ( let s = 0, li = 0, ll = tokens.length; li < ll; li++ ) {

    const lineTokens = tokens[li];

    for ( let ti = 0, tl = lineTokens.length; ti < tl; ti++ ) {

      const token = lineTokens[ti];
      const {color, backgroundColor, fontStyle, fontWeight, textDecoration} = token;

      const highlightId = `${color}-${backgroundColor}-${fontStyle}-${fontWeight}-${textDecoration}`;
      const highlights = Highlights.getHighlights ( highlightId, { color, backgroundColor, fontStyle, fontWeight, textDecoration } );
      const range = new Range ();

      range.setStart ( text, s );
      range.setEnd ( text, s + token.value.length );

      highlights.add ( range );
      disposers.push ( () => highlights.delete ( range ) );

      s += token.value.length;

    }

    if ( li < ll - 1 ) {

      s += NEWLINE.length;

    }

  }

  return [output, dispose];

};

/* EXPORT */

export default toHighlights;
