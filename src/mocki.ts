import type * as babelTypes from '@babel/types';
import type { Babel, MockiPlugin } from './types';
import { createObject, createObjectProperty } from './utils/createObject';

function isNotTS(name: string): boolean {
  return name.endsWith('.js') || name.endsWith('.jsx');
}

export default function (babel: Babel): MockiPlugin {
  const { types: t } = babel;
  const mockiFnName = 'mocki';

  return {
    name: 'mocki-transformer',
    visitor: {
      Program: {
        enter(programPath, state) {
          // @ts-ignore
          const fileName = state.file.opts.filename;

          if (isNotTS(fileName)) {
            return;
          }

          programPath.traverse({
            CallExpression(callPath) {
              // @ts-ignore prop `name` exists
              if (callPath.node.callee.name !== mockiFnName) return;

              let mockedObject = null;
              const [mockiArgs] = callPath.node?.arguments;
              const [typeParameters] = callPath.node.typeParameters?.params!;
              // @ts-ignore
              const mockiGenericName = typeParameters.typeName.name;

              if (t.isTSTypeReference(typeParameters)) {
                programPath.traverse({
                  TSInterfaceDeclaration(identifierPath) {
                    const interfaceName = identifierPath.node.id.name;

                    if (interfaceName !== mockiGenericName) return;

                    identifierPath.traverse({
                      TSPropertySignature(interfacePath) {
                        const [contract] = interfacePath.container as object[];
                        // @ts-ignore
                        const attributeName = contract.key.name;
                        const attributeValueType =
                          // @ts-ignore
                          contract.typeAnnotation.typeAnnotation;

                        const a = t.isTSStringKeyword(attributeValueType);
                      },
                    });
                  },
                });
              }

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

              callPath.replaceWith(mockedObject!);
            },
          });
        },
      },
    },
  };
}
