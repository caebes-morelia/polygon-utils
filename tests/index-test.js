/* eslint max-len: ["error", { "ignoreStrings": true }] */

import { assert } from 'chai';

import putil from '../src/index';

describe('Test geopoints inside geopolygons', () => {
  it('putil should be imported', () => {
    assert.typeOf(putil, 'object');
  });

  it('putil should have a function named isInsidePolygon(<Array Polygon>, <Object Point>)', () => {
    const polygon = [
      { lat: 19, lng: -101 },
      { lat: 20, lng: -101 },
      { lat: 20, lng: -102 },
      { lat: 19, lng: -102 },
    ];
    const point = { lat: 19.5, lng: -101.5 };

    assert.typeOf(putil.isInsidePolygon, 'function');
    assert.typeOf(putil.isInsidePolygon(polygon, point), 'boolean');
  });

  it('putil should have a function named isInsidePolyCircle(<Object Circle>, <Object Point>)', () => {
    const circle = {
      center: {
        lat: 19,
        lng: -101,
      },
      radius: 21, // radius in km
    };
    const point = { lat: 19.3, lng: -101 };

    assert.typeOf(putil.isInsidePolyCircle, 'function');
    assert.typeOf(putil.isInsidePolyCircle(circle, point), 'boolean');
  });
});
