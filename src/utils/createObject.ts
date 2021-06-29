import type * as babelTypes from '@babel/types';
import type { BabelTypes, ValueTypes, PropLiteralType } from '../types';

function createObject(t: BabelTypes, props: babelTypes.ObjectProperty[]) {
  return t.objectExpression(props);
}

function createObjectProperty(
  t: BabelTypes,
  key: string,
  value: string | boolean | number,
  type: ValueTypes
) {
  const generateObject = (propValue: PropLiteralType) =>
    t.objectProperty(t.identifier(key), propValue);

  switch (type) {
    case 'BooleanLiteral':
      return generateObject(t.booleanLiteral(value as boolean));
    case 'StringLiteral':
      return generateObject(t.stringLiteral(value as string));
    case 'NumericLiteral':
      return generateObject(t.numericLiteral(value as number));
    default:
      return generateObject(t.identifier(value as string));
  }
}

export { createObject, createObjectProperty };
