
const isInsidePolygon = (polygonPoints, objP) => {
  if (objP.lat < -90 || objP.lat > 90 || objP.lng < -180 || objP.lng > 180) {
    throw Error(`the point {lat: ${objP.lat}, lng: ${objP.lng}} is not a valid coordinate`);
  }

  polygonPoints.array.forEach((point) => {
    if (point.lat < -90 || point.lat > 90 || point.lng < -180 || point.lng > 180) {
      throw Error(`the point {lat: ${point.lat}, lng: ${point.lng}} of the polygon is not a valid coordinate`);
    }
  });

  if (polygonPoints.length < 3) {
    throw Error('the polygon must have at least 3 points');
  }

  const orderXaxis = polygonPoints.slice();
  orderXaxis.sort((a, b) => a.lat - b.lat); // are the points of the polygon but ordered from lowest to highest on the X axis

  const liminx = orderXaxis[0].lat;
  const limaxx = orderXaxis[orderXaxis.length - 1].lat;
  let liminy = 1000;
  let limaxy = -1000;

  for (let c = 0; c < polygonPoints.length; c += 1) {
    if (polygonPoints[c].lng < liminy) { // find the minimum limit in Y
      [, liminy] = polygonPoints[c];
    } else if (polygonPoints[c].lng > limaxy) { // find the maximum limit in Y
      [, limaxy] = polygonPoints[c];
    }
  }

  for (let c = 1; c < orderXaxis.length; c += 1) {
    if (orderXaxis[c].lat === orderXaxis[c - 1].lat) { // look for repeated numbers on X axis
      orderXaxis.splice(c, 1);
    }
  }

  const x = objP.lat;
  const y = objP.lng;
  let nextpoint;
  let borders = 0;
  let lx;
  let ly;
  let angle;
  let anglePoint;

  if (x > liminx && x < limaxx && y > liminy && y < limaxy) {
    // If the point is within the limits of the polygon
    let i;
    for (i = 0; i < orderXaxis.length; i += 1) { // define where you will paint the line on the X axis
      if (x <= orderXaxis[i].lat) {
        break;
      }
    }

    for (let axisx; i < orderXaxis.length; i += 1) {
      // the point is traveled along the X axis to see how many borders it crosses
      [axisx] = orderXaxis[i];
      for (let point = 0; point < polygonPoints.length; point += 1) {
        // look in the polygon points array a point that is the same distance from X as the point travel
        if (polygonPoints[point].lat === axisx) {
          // if find a point of the polygon that is at the same height on the X axis as the point
          if (point + 1 === polygonPoints.length) { // connects the last point with the first one of the polygon
            nextpoint = 0;
          } else {
            nextpoint = point + 1;
          }
          // ---------------------------------BORDER UP--------------------------------------------
          if (polygonPoints[point].lng >= y) {
            // if the polygon's found point is higher on the Y axis
            if (polygonPoints[point - 1].lng <= y && polygonPoints[point - 1].lat <= axisx) {
              if (borders === 0 && x <= polygonPoints[point].lat && x > polygonPoints[point - 1].lat) {
                lx = Math.abs(polygonPoints[point].lat - polygonPoints[point - 1].lat);
                ly = Math.abs(polygonPoints[point].lng - polygonPoints[point - 1].lng);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point].lat - x);
                ly = Math.abs(polygonPoints[point].lng - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            } else if (polygonPoints[nextpoint].lng <= y && polygonPoints[nextpoint].lat <= axisx) {
              // if the previous or next point of the point found is below the point on the Y axis
              // and behind the X axis of the current point and in front of X
              if (borders === 0 && x <= polygonPoints[point].lat && x > polygonPoints[nextpoint].lat) {
                lx = Math.abs(polygonPoints[point].lat - polygonPoints[nextpoint].lat);
                ly = Math.abs(polygonPoints[point].lng - polygonPoints[nextpoint].lng);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point].lat - x);
                ly = Math.abs(polygonPoints[point].lng - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            }
          } else if (polygonPoints[point].lng < y) {
            // -----------------------------------BORDER DOWN------------------------------------------
            // if the found point of the polygon is lower on the Y axis
            if (polygonPoints[point - 1].lng >= y && polygonPoints[point - 1].lat <= axisx) {
              // if the previous or next point of the point found are above the point on the Y axis & back on the X axis
              if (borders === 0 && x <= polygonPoints[point].lat && x > polygonPoints[point - 1].lat) {
                lx = Math.abs(polygonPoints[point].lat - polygonPoints[point - 1].lat);
                ly = Math.abs(polygonPoints[point].lng - polygonPoints[point - 1].lng);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point].lat - x);
                ly = Math.abs(polygonPoints[point].lng - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            } else if (polygonPoints[nextpoint].lng >= y && polygonPoints[nextpoint].lat <= axisx) {
              if (borders === 0 && x <= polygonPoints[point].lat && x > polygonPoints[nextpoint].lat) {
                lx = Math.abs(polygonPoints[point].lat - polygonPoints[nextpoint].lat);
                ly = Math.abs(polygonPoints[point].lng - polygonPoints[nextpoint].lng);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point].lat - x);
                ly = Math.abs(polygonPoints[point].lng - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            }
          }
        }
      }
    }
  }

  if (borders % 2 === 0) {
    return true;
  }
  return false;
};


export default isInsidePolygon;
