import type { Args } from '../args';

const withSingleArg: Args = {
  title: 'when single arg is given',
  fixture: 'withArgs/__fixtures__/input.ts',
  outputFixture: 'withArgs/__fixtures__/output.ts',
};

export const withArgs = [withSingleArg];
