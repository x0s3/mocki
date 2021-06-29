# Mocki.js

> WIP

_Spoiler_ 👀

```ts
import { mocki } from 'mocki';

interface Foo {
  bar: string;
}

test('Autogenerate mocks for my interface', () => {
  // `mocki` will transform it to an object with the interface properties filled in
  const mockFooProps = mocki<Foo>();

  expect(mockFooProps).toHaveProperty('bar');
});
```
