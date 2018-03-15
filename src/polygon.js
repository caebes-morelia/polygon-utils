
const polygonPoints1 = [[1, 3], [3, 3], [4, 4], [6, 4], [7, 3], [8, 5], [5, 7], [4, 5], [2, 6]]; // points that make up the polygon
const objPoint = { lat: 19.7293, lon: -101.1754 };

const isInsidePolygon = (polygonPoints, objP) => {
  if (objP.lat < -90 || objP.lat > 90 || objP.lon < -180 || objP.lon > 180) {
    const err = { message: 'the point is not a valid coordinate' };
    throw err;
  }

  const orderXaxis = polygonPoints.slice();
  orderXaxis.sort(); // are the points of the polygon but ordered from lowest to highest on the X axis

  const liminx = orderXaxis[0][0];
  const limaxx = orderXaxis[orderXaxis.length - 1][0];
  let liminy = 1000;
  let limaxy = -1000;

  for (let c = 0; c < polygonPoints.length; c += 1) {
    if (polygonPoints[c][1] < liminy) { // find the minimum limit in Y
      [, liminy] = polygonPoints[c];
    } else if (polygonPoints[c][1] > limaxy) { // find the maximum limit in Y
      [, limaxy] = polygonPoints[c];
    }
  }

  for (let c = 1; c < orderXaxis.length; c += 1) {
    if (orderXaxis[c][0] === orderXaxis[c - 1][0]) { // look for repeated numbers on X axis
      orderXaxis.splice(c, 1);
    }
  }

  const x = objP.lat;
  const y = objP.lon;
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
      if (x <= orderXaxis[i][0]) {
        break;
      }
    }

    for (let axisx; i < orderXaxis.length; i += 1) {
      // the point is traveled along the X axis to see how many borders it crosses
      [axisx] = orderXaxis[i];
      for (let point = 0; point < polygonPoints.length; point += 1) {
        // look in the polygon points array a point that is the same distance from X as the point travel
        if (polygonPoints[point][0] === axisx) {
          // if find a point of the polygon that is at the same height on the X axis as the point
          if (point + 1 === polygonPoints.length) { // connects the last point with the first one of the polygon
            nextpoint = 0;
          } else {
            nextpoint = point + 1;
          }
          // ---------------------------------BORDER UP--------------------------------------------
          if (polygonPoints[point][1] >= y) {
            // if the polygon's found point is higher on the Y axis
            if (polygonPoints[point - 1][1] <= y && polygonPoints[point - 1][0] <= axisx) {
              if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[point - 1][0]) {
                lx = Math.abs(polygonPoints[point][0] - polygonPoints[point - 1][0]);
                ly = Math.abs(polygonPoints[point][1] - polygonPoints[point - 1][1]);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point][0] - x);
                ly = Math.abs(polygonPoints[point][1] - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            } else if (polygonPoints[nextpoint][1] <= y && polygonPoints[nextpoint][0] <= axisx) {
              // if the previous or next point of the point found is below the point on the Y axis
              // and behind the X axis of the current point and in front of X
              if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[nextpoint][0]) {
                lx = Math.abs(polygonPoints[point][0] - polygonPoints[nextpoint][0]);
                ly = Math.abs(polygonPoints[point][1] - polygonPoints[nextpoint][1]);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point][0] - x);
                ly = Math.abs(polygonPoints[point][1] - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            }
          } else if (polygonPoints[point][1] < y) {
            // -----------------------------------BORDER DOWN------------------------------------------
            // if the found point of the polygon is lower on the Y axis
            if (polygonPoints[point - 1][1] >= y && polygonPoints[point - 1][0] <= axisx) {
              // if the previous or next point of the point found are above the point on the Y axis & back on the X axis
              if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[point - 1][0]) {
                lx = Math.abs(polygonPoints[point][0] - polygonPoints[point - 1][0]);
                ly = Math.abs(polygonPoints[point][1] - polygonPoints[point - 1][1]);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point][0] - x);
                ly = Math.abs(polygonPoints[point][1] - y);
                anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                if (anglePoint > angle) {
                  borders -= 1;
                }
              }
              borders += 1;
            } else if (polygonPoints[nextpoint][1] >= y && polygonPoints[nextpoint][0] <= axisx) {
              if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[nextpoint][0]) {
                lx = Math.abs(polygonPoints[point][0] - polygonPoints[nextpoint][0]);
                ly = Math.abs(polygonPoints[point][1] - polygonPoints[nextpoint][1]);
                angle = Math.atan(ly / lx) * (180 / Math.PI);
                lx = Math.abs(polygonPoints[point][0] - x);
                ly = Math.abs(polygonPoints[point][1] - y);
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

isInsidePolygon(polygonPoints1, objPoint);

export default isInsidePolygon;
