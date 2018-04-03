import isInsidePolygon from './polygon';
import isInsidePolyCircle from './circle';

const isInside = (obj, point) => {
  if (obj.length === undefined) {
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
