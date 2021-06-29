import pluginTester from 'babel-plugin-tester';
import mockiPlugin from '../mocki';
import { withArgs } from './withArgs';

pluginTester({
  plugin: mockiPlugin,
  pluginName: 'mockiPlugin',
  babelOptions: {
    presets: ['@babel/preset-typescript'],
  },
  filename: __filename,
  tests: [...withArgs],
});
