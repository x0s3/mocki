import type * as babelTypes from '@babel/types';
import type { Visitor } from '@babel/traverse';

export type ValueTypes = babelTypes.ObjectProperty['value']['type'];

export type BabelTypes = typeof babelTypes;

export type Babel = Record<'types', BabelTypes>;

export type MockiPlugin = {
  visitor: Visitor;
  name: string;
};

export type PropLiteralType =
  | babelTypes.NumericLiteral
  | babelTypes.StringLiteral
  | babelTypes.BooleanLiteral
  | babelTypes.Identifier;
