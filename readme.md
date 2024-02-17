# Tokens Highlighter

A general syntax highlighter that can render syntax highlighting tokens.

## Features

- It works both in browsers and in server-side environments (string renderers only).
- It's unopinionated about how syntax highlighting tokens are generated.
- It supports various rendering modes: HTML, DOM, ANSI, String and CSS Custom Highlights.

## Install

```sh
npm install --save tokens-highlighter
```

## Usage

```ts
import {toANSI, toDOM, toHighlights, toHTML, toString} from 'tokens-highlighter';

// First of all we need some tokens to render
// Tokens are grouped by line, for each line we have an array of tokens
// This library is totally agnostic regarding how these tokens are generated

const TOKENS = [
  [
    {
      "value": "<",
      "color": "#24292E",
      "backgroundColor": "#FFF"
    },
    {
      "value": "script",
      "color": "#22863A",
      "backgroundColor": "#FFF",
      "fontStyle": "italic",
      "fontWeight": "bold",
      "textDecoration": "underline"
    },
    {
      "value": ">",
      "color": "#24292E",
      "backgroundColor": "#FFF"
    }
  ]
];

// Rendering to HTML

const html = toHTML ( TOKENS, { backgroundColor: '#ffffff' } );

// Rendering to a DOM element directly
// This is more efficient when done on the client, as it bypasses both HTML escaping and HTML parsing

const node = toDOM ( TOKENS );

// Rendering to a string with ANSI escape codes, for the terminal

const ansi = toANSI ( TOKENS );

// Rendering to a plain string, maybe for debugging

const string = toString ( TOKENS );

// Rendering to CSS Custom Highlights
// This rendering mode is special in that it is able to syntax highlight a Text node directly, ZERO extra nodes needed!

const [node, dispose] = toHighlights ( TOKENS );

dispose (); // The dispose function cleans up all the CSS Custom Highlights, allowing the nodes to be garbage collected
```

## License

MIT © Fabio Spampinato
