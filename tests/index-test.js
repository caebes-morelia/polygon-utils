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
      lat: 19,
      lng: -101,
      radius: 21, // radius in km
    };
    const point = { lat: 19.3, lng: -101 };

    assert.typeOf(putil.isInsidePolyCircle, 'function');
    assert.typeOf(putil.isInsidePolyCircle(circle, point), 'boolean');
  });

  it('Point should be inside polygon', () => {
    const polygon = [[
      { lat: 19, lng: -101 },
      { lat: 20, lng: -101 },
      { lat: 20, lng: -102 },
      { lat: 19, lng: -102 },
    ],
    [
      { lat: 19.68784, lng: -101.23815 },
      { lat: 19.68639, lng: -101.20588 },
      { lat: 19.69593, lng: -101.19077 },
      { lat: 19.69657, lng: -101.16777 },
      { lat: 19.68784, lng: -101.15816 },
      { lat: 19.7116, lng: -101.147 },
      { lat: 19.72935, lng: -101.17455 },
      { lat: 19.72033, lng: -101.18751 },
      { lat: 19.72695, lng: -101.2112 },
    ],
    ];
    const point = { lat: 19.9, lng: -101.9 };
    const point2 = { lat: 19.70926, lng: -101.19584 };
    const point3 = { lat: 19.69334, lng: -101.19884 };
    const point4 = { lat: 19.69043, lng: -101.19627 };

    assert.isOk(putil.isInsidePolygon(polygon[0], point));
    assert.isOk(putil.isInsidePolygon(polygon[1], point2));
    assert.isOk(putil.isInsidePolygon(polygon[1], point3));
    assert.isNotOk(putil.isInsidePolygon(polygon[1], point4));
  });

  it('Point should be inside circle', () => {
    const circle = {
      lat: 19,
      lng: -101,
      radius: 21, // radius in km
    };
    const point = { lat: 19.003, lng: -101 };

    assert.isOk(putil.isInsidePolyCircle(circle, point));
  });

  it('putil should have a function named isInside(<Object>, <Point>)', () => {
    assert.typeOf(putil.isInside, 'function');
  });

  it('isInside(<Polygon>, <Point>) should return boolean', () => {
    const polygon = [
      { lat: 19, lng: -101 },
      { lat: 20, lng: -101 },
      { lat: 20, lng: -102 },
      { lat: 19, lng: -102 },
    ];
    const point = { lat: 19.5, lng: -101.5 };

    assert.typeOf(putil.isInside(polygon, point), 'boolean');
  });

  it('isInside(<Circle>, <Point>) should return boolean', () => {
    const circle = {
      lat: 19,
      lng: -101,
      radius: 21, // radius in km
    };
    const point = { lat: 19.003, lng: -101 };

    assert.typeOf(putil.isInside(circle, point), 'boolean');
  });

  it('isInsidePolygon should throw error on wrong invalid lat lng', () => {
    const invalidPolygon = [
      { lat: -92, lng: 182 },
      { lat: -92, lng: 80 },
      { lat: 85, lng: -182 },
    ];
    const point = { lat: 19, lng: -101 };
    const errorMsgs = [];
    try {
      putil.isInsidePolygon(invalidPolygon, point);
    } catch (error) {
      errorMsgs.push(error);
    }

    assert.equal(errorMsgs[0].message, `the point {lat: ${invalidPolygon[0].lat}, lng: ${invalidPolygon[0].lng}} of the polygon is not a valid coordinate`);
  });

  it('isInsidePolygon should throw error on wrong invalid lat lng point', () => {
    const polygon = [[
      { lat: -87, lng: 172 }, { lat: -52, lng: 80 }, { lat: 85, lng: -122 },
    ],
    [
      { lat: 19, lng: -101 },
      { lat: 19.0092, lng: -101.0002 },
      { lat: 19.0097, lng: -101.0011 },
      { lat: 19.0103, lng: -101.0252 },
    ]];
    const point = { lat: 99, lng: -191 };
    const point2 = { lat: 19, lng: -195 };
    const point3 = { lat: 120, lng: -101 };
    const errorMsgs = [];
    try {
      for (let i = 0; i < polygon.length; i += 1) {
        putil.isInsidePolygon(polygon[i], point);
      }
    } catch (error) {
      errorMsgs.push(error);
    }
    try {
      putil.isInsidePolygon(polygon, point2);
    } catch (error) {
      errorMsgs.push(error);
    }
    try {
      putil.isInsidePolygon(polygon, point3);
    } catch (error) {
      errorMsgs.push(error);
    }

    assert.equal(errorMsgs.length, 3);
    assert.equal(errorMsgs[0].message, `the point {lat: ${point.lat}, lng: ${point.lng}} is not a valid coordinate`);
    assert.equal(errorMsgs[1].message, `the point {lat: ${point2.lat}, lng: ${point2.lng}} is not a valid coordinate`);
    assert.equal(errorMsgs[2].message, `the point {lat: ${point3.lat}, lng: ${point3.lng}} is not a valid coordinate`);
  });

  it('isInsidePolyCircle should throw error on wrong invalid lat lng', () => {
    const invalidCircle = {
      lat: 219,
      lng: -201,
      radius: 21, // radius in km
    };
    const point = { lat: 19.003, lng: -101 };
    const errorMsgs = [];
    try {
      putil.isInsidePolyCircle(invalidCircle, point);
    } catch (error) {
      errorMsgs.push(error);
    }

    assert.equal(errorMsgs.length, 1);
    assert.equal(errorMsgs[0].message, `the center of the circle {lat: ${invalidCircle.lat}, lng: ${invalidCircle.lng}} is not a valid coordinate`);
  });

  it('isInsidePolyCircle should throw error on wrong invalid lat lng point', () => {
    const circle = {
      lat: 19,
      lng: -101,
      radius: 21, // radius in km
    };
    const point = { lat: 199.003, lng: 211 };
    const errorMsgs = [];
    try {
      putil.isInsidePolyCircle(circle, point);
    } catch (error) {
      errorMsgs.push(error);
    }

    assert.equal(errorMsgs.length, 1);
    assert.equal(errorMsgs[0].message, `the point {lat: ${point.lat}, lng: ${point.lng}} is not a valid coordinate`);
  });

  it('the polygon should have at least 3 points', () => {
    const invalidPolygon = [
      { lat: -87, lng: 172 },
      { lat: -52, lng: 80 },
    ];
    const point = { lat: 19.003, lng: -101 };
    const errorMsgs = [];
    try {
      putil.isInsidePolygon(invalidPolygon, point);
    } catch (error) {
      errorMsgs.push(error);
    }

    assert.equal(errorMsgs[0].message, 'the polygon must have at least 3 points');
  });
});
