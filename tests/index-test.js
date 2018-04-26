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
      { lat: 19, lng: -101 }, // poligono 0
      { lat: 20, lng: -101 },
      { lat: 20, lng: -102 },
      { lat: 19, lng: -102 },
    ],
    [
      { lat: 19.68784, lng: -101.23815 }, // poligono 1
      { lat: 19.68639, lng: -101.20588 },
      { lat: 19.69593, lng: -101.19077 },
      { lat: 19.69657, lng: -101.16777 },
      { lat: 19.68784, lng: -101.15816 },
      { lat: 19.7116, lng: -101.147 },
      { lat: 19.72935, lng: -101.17455 },
      { lat: 19.72033, lng: -101.18751 },
      { lat: 19.72695, lng: -101.2112 },
    ],
    [
      { lat: 19.81281, lng: -101.80171 }, // poligono 2
      { lat: 19.8116, lng: -101.79107 },
      { lat: 19.82339, lng: -101.77803 },
      { lat: 19.82137, lng: -101.78712 },
      { lat: 19.82678, lng: -101.79553 },
      { lat: 19.82848, lng: -101.78395 },
      { lat: 19.82969, lng: -101.80154 },
    ],
    [
      { lat: 19.8749, lng: -101.14082 }, // poligono 3
      { lat: 19.90105, lng: -101.11919 },
      { lat: 19.91299, lng: -101.15558 },
    ],
    [
      { lat: 19.65826, lng: -101.51942 }, // poligono 4
      { lat: 19.64759, lng: -101.53264 },
      { lat: 19.66473, lng: -101.53349 },
      { lat: 19.67346, lng: -101.5201 },
    ],
    [
      { lat: 19.8202, lng: -101.58632 }, // poligono 5
      { lat: 19.8269, lng: -101.5801 },
      { lat: 19.81976, lng: -101.59194 },
      { lat: 19.81201, lng: -101.58246 },
    ],
    [
      { lat: 19.80353, lng: -101.39625 }, // poligono 6
      { lat: 19.84551, lng: -101.38114 },
      { lat: 19.83712, lng: -101.49101 },
      { lat: 19.79642, lng: -101.45393 },
      { lat: 19.7667, lng: -101.51023 },
    ],
    [
      { lat: 19.77187, lng: -101.33308 }, // poligono 7
      { lat: 19.80353, lng: -101.26235 },
      { lat: 19.82678, lng: -101.31042 },
      { lat: 19.79771, lng: -101.29119 },
    ],
    [
      { lat: 19.75184, lng: -101.38732 }, // poligono 8
      { lat: 19.70595, lng: -101.41067 },
      { lat: 19.63418, lng: -101.41136 },
      { lat: 19.71112, lng: -101.39076 },
    ],
    [
      { lat: 19.65164, lng: -101.1985 }, // poligono 9
      { lat: 19.63676, lng: -101.23764 },
      { lat: 19.66651, lng: -101.32072 },
    ],
    ];
    const point = [
      { lat: 19.9, lng: -101.9 },
      { lat: 19, lng: -102 },
      { lat: 20, lng: -101 },
      { lat: 19, lng: -101.5 },
      { lat: 19.70926, lng: -101.19584 },
      { lat: 19.69334, lng: -101.19884 },
      { lat: 19.69043, lng: -101.19627 },
      { lat: 19.81637, lng: -101.78893 },
      { lat: 19.81721, lng: -101.78176 },
      { lat: 19.88362, lng: -101.13601 },
      { lat: 19.88297, lng: -101.147 },
      { lat: 19.65131, lng: -101.52963 },
      { lat: 19.64921, lng: -101.52997 },
      { lat: 19.81528, lng: -101.58559 },
      { lat: 19.81342, lng: -101.58473 },
      { lat: 19.81322, lng: -101.4141 },
      { lat: 19.77381, lng: -101.47315 },
      { lat: 19.79367, lng: -101.28931 },
      { lat: 19.78124, lng: -101.3039 },
      { lat: 19.72372, lng: -101.39968 },
      { lat: 19.66651, lng: -101.40003 },
      { lat: 19.65002, lng: -101.22596 },
      { lat: 19.64032, lng: -101.21841 },
    ];

    assert.isOk(putil.isInsidePolygon(polygon[0], point[0]));
    assert.isOk(putil.isInsidePolygon(polygon[0], point[1]));
    assert.isOk(putil.isInsidePolygon(polygon[0], point[2]));
    assert.isOk(putil.isInsidePolygon(polygon[0], point[3]));
    assert.isOk(putil.isInsidePolygon(polygon[1], point[4]));
    assert.isOk(putil.isInsidePolygon(polygon[1], point[5]));
    assert.isNotOk(putil.isInsidePolygon(polygon[1], point[6]));
    assert.isOk(putil.isInsidePolygon(polygon[2], point[7]));
    assert.isNotOk(putil.isInsidePolygon(polygon[2], point[8]));
    assert.isOk(putil.isInsidePolygon(polygon[3], point[9]));
    assert.isNotOk(putil.isInsidePolygon(polygon[3], point[10]));
    assert.isOk(putil.isInsidePolygon(polygon[4], point[11]));
    assert.isNotOk(putil.isInsidePolygon(polygon[4], point[12]));
    assert.isOk(putil.isInsidePolygon(polygon[5], point[13]));
    assert.isNotOk(putil.isInsidePolygon(polygon[5], point[14]));
    assert.isOk(putil.isInsidePolygon(polygon[6], point[15]));
    assert.isNotOk(putil.isInsidePolygon(polygon[6], point[16]));
    assert.isOk(putil.isInsidePolygon(polygon[7], point[17]));
    assert.isNotOk(putil.isInsidePolygon(polygon[7], point[18]));
    assert.isOk(putil.isInsidePolygon(polygon[8], point[19]));
    assert.isNotOk(putil.isInsidePolygon(polygon[8], point[20]));
    // assert.isOk(putil.isInsidePolygon(polygon[9], point[21]));
    assert.isNotOk(putil.isInsidePolygon(polygon[9], point[22]));
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
