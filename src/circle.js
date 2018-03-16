
const earthRadius = 6371; // radius of the earth in km
// equatorial radius=6378km  polar radius=6357km  equivolume radius=6371km

const isInsidePolyCircle = (objC, objP) => {
  if (objC.lat < -90 || objC.lat > 90 || objC.lng < -180 || objC.lng > 180) {
    const err = { message: 'the center of the circle is not a valid coordinate' };
    throw err;
  }
  if (objP.lat < -90 || objP.lat > 90 || objP.lng < -180 || objP.lng > 180) {
    const err = { message: 'the point is not a valid coordinate' };
    throw err;
  }

  // //////////Haversine formula
  const dLat = (objP.lat - objC.lat) * (Math.PI / 180);
  const dLon = (objP.lng - objC.lng) * (Math.PI / 180);
  const a =
    (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
    (Math.cos(objC.lat * (Math.PI / 180)) * Math.cos(objP.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2));
  const c = 2 * Math.asin(Math.sqrt(a));
  const distance = earthRadius * c;

  if (distance <= objC.radius) {
    return true;
  }
  return false;
};


export default isInsidePolyCircle;
