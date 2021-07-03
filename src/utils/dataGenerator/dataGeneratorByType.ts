import { generator as generate } from '../generateData';

function generateAndFillArray(fn: any) {
  return Array.from({ length: 5 }, () => fn());
}

function generateDataByType(type: any) {
  switch (type) {
    case 'TSStringKeyword':
      return generate.string();
    case 'TSNumberKeyword':
      return generate.integer();
    case 'TSBooleanKeyword':
      return generate.bool();
    case 'TSArrayType':
      switch (type.elementType.type) {
        case 'TSNumberKeyword':
          return generateAndFillArray(generate.integer);
        case 'TSStringKeyword':
          return generateAndFillArray(generate.string);
        case 'TSBooleanKeyword':
          return generateAndFillArray(generate.bool);
      }
  }
}

export { generateDataByType };
