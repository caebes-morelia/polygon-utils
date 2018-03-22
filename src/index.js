import isInsidePolygon from './polygon';
import isInsidePolyCircle from './circle';

const isInside = (obj, point) => {
  const key = Object.keys(obj);
  if (key[0] === 0) {
    return isInsidePolygon(obj, point);
  }
  return isInsidePolyCircle(obj, point);
};

const putil = {
  isInsidePolygon,
  isInsidePolyCircle,
  isInside,
};


export default putil;
