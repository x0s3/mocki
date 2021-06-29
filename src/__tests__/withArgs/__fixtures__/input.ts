import { mocki } from '../../../index';

interface Foo {
  bar: string;
}

const mockFoo = mocki<Foo>({ bar: 'fooBar' });
