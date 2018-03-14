
const r = 3;
const radius = 6371; // radius of the earth in km
// equatorial radius=6378km  polar radius=6357km  equivolume radius=6371km

// isInsidePolyCircle(<Circle>, <Point>)
const objCircle = { lat: 19.729378, lon: -101.175365, radius: 3 };
const objPoint = { lat: 19.7293, lon: -101.1754 };

const isInsidePolyCircle = (objC, objP) => {
  if (objC.lat < -90 || objC.lat > 90 || objC.lon < -180 || objC.lon > 180) {
    const err = { message: 'the center of the circle is not a valid coordinate' };
    throw err;
  }
  if (objP.lat < -90 || objP.lat > 90 || objP.lon < -180 || objP.lon > 180) {
    const err = { message: 'the point is not a valid coordinate' };
    throw err;
  }

  // //////////Haversine formula
  const dLat = (objP.lat - objC.lat) * (Math.PI / 180);
  const dLon = (objP.lon - objC.lon) * (Math.PI / 180);
  const a =
    (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
    (Math.cos(objC.lat * (Math.PI / 180)) * Math.cos(objP.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2));
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = radius * c;

  if (distance <= r) {
    return true;
  }
  return false;
};

isInsidePolyCircle(objCircle, objPoint);

export default isInsidePolyCircle;
