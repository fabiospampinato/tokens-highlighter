
/* IMPORT */

import {NEWLINE} from './constants';
import type {Token} from './types';

/* HELPERS */

const hex2rgb = ( hex: string ): { r: number, g: number, b: number } | undefined => {
  if ( hex.length === 3 || hex.length === 4 ) {
    const r = parseInt ( `${hex[0]}${hex[0]}`, 16 );
    const g = parseInt ( `${hex[1]}${hex[1]}`, 16 );
    const b = parseInt ( `${hex[2]}${hex[2]}`, 16 );
    return { r, g, b };
  } else if ( hex.length === 6 || hex.length === 8 ) {
    const r = parseInt ( hex.slice ( 0, 2 ), 16 );
    const g = parseInt ( hex.slice ( 2, 4 ), 16 );
    const b = parseInt ( hex.slice ( 4, 6 ), 16 );
    return { r, g, b };
  } else {
    return; //TODO: Support more color formats, with a more sophisticated "khroma.toRgba", maybe
  }
};

const withForeground = ( value: string, color: string ): string => {
  const rgb = hex2rgb ( color.slice ( 1 ) );
  if ( !rgb ) return value;
  return `\x1b[38;2;${rgb.r};${rgb.g};${rgb.b}m${value}\x1b[39m`;
};

const withBackground = ( value: string, color: string ): string => {
  const rgb = hex2rgb ( color.slice ( 1 ) );
  if ( !rgb ) return value;
  return `\x1b[48;2;${rgb.r};${rgb.g};${rgb.b}m${value}\x1b[49m`;
};

const withItalic = ( value: string ): string => {
  return `\x1b[3m${value}\x1b[0m`;
};

const withBold = ( value: string ): string => {
  return `\x1b[1m${value}\x1b[0m`;
};

const withUnderline = ( value: string ): string => {
  return `\x1b[4m${value}\x1b[0m`;
};

const withStyle = ( value: string, token: Token ): string => {
  if ( token.color ) value = withForeground ( value, token.color );
  if ( token.backgroundColor ) value = withBackground ( value, token.backgroundColor );
  if ( token.fontStyle === 'italic' ) value = withItalic ( value );
  if ( token.fontWeight === 'bold' ) value = withBold ( value );
  if ( token.textDecoration === 'underline' ) value = withUnderline ( value );
  return value;
};

/* MAIN */

const toANSI = ( tokens: Token[][] ): string => {

  let output = '';

  for ( let li = 0, ll = tokens.length; li < ll; li++ ) {

    const lineTokens = tokens[li];

    for ( let ti = 0, tl = lineTokens.length; ti < tl; ti++ ) {

      const token = lineTokens[ti];

      output += withStyle ( token.value, token );

    }

    if ( li < ll - 1 ) {

      output += NEWLINE;

    }

  }

  return output;

};

/* EXPORT */

export default toANSI;
