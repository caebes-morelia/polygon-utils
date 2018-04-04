import isInsidePolygon from './polygon';
import isInsidePolyCircle from './circle';

const isInside = (obj, point) => {
  if (obj.length === undefined) {
    return isInsidePolyCircle(obj, point);
  }
  return isInsidePolygon(obj, point);
};

const putil = {
  isInsidePolygon,
  isInsidePolyCircle,
  isInside,
};


export default putil;
