
/* IMPORT */

import {toANSI, toDOM, toHighlights, toHTML, toString} from '../src';
import TOKENS from './tokens.json';

/* MAIN */

const renderToANSI = (): void => {

  const output = toANSI ( TOKENS );

  console.log ( output );

};

const renderToHTML = (): void => {

  const target = document.getElementById ( 'output-html' )!;
  const output = toHTML ( TOKENS );

  target.innerHTML = '';
  target.innerHTML = output;

};

const renderToDOM = (): void => {

  const target = document.getElementById ( 'output-dom' )!;
  const output = toDOM ( TOKENS );

  target.innerHTML = '';
  target.appendChild ( output );

};

const renderToHighlights = (): void => {

  const target = document.getElementById ( 'output-highlights' )!;
  const [output, dispose] = toHighlights ( TOKENS );

  target.innerHTML = '';
  target.appendChild ( output );

  // setTimeout ( dispose, 2000 );

};

const renderToString = (): void => {

  const target = document.getElementById ( 'output-string' )!;
  const output = toString ( TOKENS );

  target.innerText = output;

};

const renderHighlights = (): void => {

  renderToANSI ();
  renderToHTML ();
  renderToDOM ();
  renderToHighlights ();
  renderToString ();

};

renderHighlights ();
