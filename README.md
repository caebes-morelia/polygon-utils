# polygon-utils

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe polygon-utils here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo


Polygon-utils is a library focused to be used in applications that work with GPS support and with the need to know if any point is within a certain area in the earth globe.
The way in which polygon-utils works is with geo-polar coordinates (latitude and longitude), and it can work with polygons or with circles; the way to know if a point is inside the circle is to measure the distance between the point mentioned and the center of the circle, if the distance is less than or equal to the radius of the circle, it is known that the point is inside, while for the polygon it is to see how many borders the point crosses upwards, and if the number of borders covered is an odd number, it is known that the point is inside.


## Installation


## Usage

Polygon-points receives as parameters two objects; the first is the polygon or circle in which you want to know if there is a point within it, in case of being a polygon you receive an array of objects from all the points that make up polygon, and if it is a circle it is sends an object with a point, which is the center of the circle, and the radius of the circle expressed in kilometers; and the second parameter that it receives is the point that is required to know if it is inside the polygon or outside it.
Then it will return true if the point is inside the polygon, otherwise it will return false.


An example of how to send parameters in the case of the polygon is the following:

```js
const polygon = [
      { lat: 19, lng: -101 },
      { lat: 20, lng: -101 },
      { lat: 20, lng: -102 },
      { lat: 19, lng: -102 },
    ];
const point = { lat: 19.5, lng: -101.5 };

isInsidePolygon(polygon, point);
```
> In this example the function returns true because the point is inside the polygon, which is a square.

The following example shows the parameters that are sent to know if a point is inside a circle:

```js
const circle = {
      lat: 19,
      lng: -101,
      radius: 21, // radius in km
    };
const point = { lat: 19.3, lng: -101 };

isInsidePolyCircle(circlec, point);
```
> In this example the function also returns true because the point is inside the circle