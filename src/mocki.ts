import type * as babelTypes from '@babel/types';
import type { Babel, MockiPlugin } from './types';
import { createObject, createObjectProperty } from './utils/createObject';

export default function (babel: Babel): MockiPlugin {
  const { types: t } = babel;
  const mockiFnName = 'mocki';

  return {
    name: 'mocki-transformer',
    visitor: {
      CallExpression(path) {
        // @ts-ignore prop `name` exists
        if (path.node.callee.name !== mockiFnName) return;

        let mockedObject = null;
        const [mockiArgs] = path.node?.arguments;

        if (mockiArgs) {
          // @ts-ignore prop `properties` exists
          const props = mockiArgs.properties?.map(
            (prop: babelTypes.ObjectProperty) =>
              createObjectProperty(
                t,
                // @ts-ignore prop `name` exists
                prop.key.name,
                // @ts-ignore prop `value` exists
                prop.value.value,
                prop.value.type
              )
          );

          mockedObject = createObject(t, props);
        }

        path.replaceWith(mockedObject!);
      },
    },
  };
}
