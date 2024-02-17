
/* MAIN */

type Disposer = {
  (): void
};

type Options = {
  backgroundColor?: string
};

type Token = {
  value: string,
  color?: string,
  backgroundColor?: string,
  fontStyle?: string, // italic
  fontWeight?: string, // bold
  textDecoration?: string // underline
};

/* EXPORT */

export type {Disposer, Options, Token};
