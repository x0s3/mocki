import { types as t } from '@babel/core';
import { createObject, createObjectProperty } from './createObject';

describe('Object utils', () => {
  describe('createObject', () => {
    it('returns an object with the given props', () => {
      const object = createObject(t, [
        createObjectProperty(t, 'key1', true, 'BooleanLiteral'),
        createObjectProperty(t, 'key2', 'value2', 'StringLiteral'),
        createObjectProperty(t, 'key3', 288, 'NumericLiteral'),
      ]);

      expect(object).toHaveProperty('properties');
      expect(object.properties).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            key: expect.objectContaining({ name: 'key1' }),
            value: expect.objectContaining({ value: true }),
          }),
          expect.objectContaining({
            key: expect.objectContaining({ name: 'key2' }),
            value: expect.objectContaining({ value: 'value2' }),
          }),
          expect.objectContaining({
            key: expect.objectContaining({ name: 'key3' }),
            value: expect.objectContaining({ value: 288 }),
          }),
        ])
      );
    });
  });

  describe('createObjectProperty', () => {
    it('returns `BooleanLiteral` when `boolean` type is given', () => {
      const prop = createObjectProperty(t, 'key', false, 'BooleanLiteral');

      expect(prop).toEqual(
        expect.objectContaining({
          key: expect.objectContaining({ name: 'key' }),
          value: expect.objectContaining({ value: false }),
        })
      );
    });

    it('returns `StringnLiteral` when `string` type is given', () => {
      const prop = createObjectProperty(t, 'key', 'value', 'StringLiteral');

      expect(prop).toEqual(
        expect.objectContaining({
          key: expect.objectContaining({ name: 'key' }),
          value: expect.objectContaining({ value: 'value' }),
        })
      );
    });

    it('returns `NumericLiteral` when `number` type is given', () => {
      const prop = createObjectProperty(t, 'key', 288, 'NumericLiteral');

      expect(prop).toEqual(
        expect.objectContaining({
          key: expect.objectContaining({ name: 'key' }),
          value: expect.objectContaining({ value: 288 }),
        })
      );
    });
  });
});
