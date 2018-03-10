// var points_pologono = [][];
const polygonPoints = [[1, 3], [3, 3], [4, 4], [6, 4], [7, 3], [8, 5], [5, 7], [4, 5], [2, 6]]; // points that make up the polygon
const orderXaxis = polygonPoints.slice();
orderXaxis.sort(); // are the points of the polygon but ordered from lowest to highest on the X axis

const liminx = orderXaxis[0][0];
const limaxx = orderXaxis[orderXaxis.length - 1][0];
let liminy = 1000;
let limaxy = -1000;

for (let c = 0; c < polygonPoints.length; c += 1) {
  if (polygonPoints[c][1] < liminy) {
    liminy = polygonPoints[c][1];
  } else if (polygonPoints[c][1] > limaxy) {
    // find the minimum limit in Y
    limaxy = polygonPoints[c][1];
  } // find the maximum limit in Y
}

for (let c = 1; c < orderXaxis.length; c += 1) {
  if (orderXaxis[c][0] === orderXaxis[c - 1][0]) {
    orderXaxis.splice(c, 1);
  } // look for repeated numbers on X axis
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let x;
let y;
let nextpoint;
let borders = 0;
let lx;
let ly;
let angle;
let anglePoint;
rl.question('enter the X coordinate of the point: ', (answer) => {
  x = answer;
  rl.question('enter the Y coordinate of the point: ', (answer2) => {
    y = answer2;

    if (x > liminx && x < limaxx && y > liminy && y < limaxy) {
      // If the point is within the limits of the polygon
      let i;
      for (i = 0; i < orderXaxis.length; i += 1) {
        if (x <= orderXaxis[i][0]) {
          break;
        }
      } // define where you will paint the line on the X axis

      for (let axisx; i < orderXaxis.length; i += 1) {
        // the point is traveled along the X axis to see how many borders it crosses
        axisx = orderXaxis[i][0]; // console.log('axisx: '+axisx);
        for (let point = 0; point < polygonPoints.length; point += 1) {
          // look in the polygon points array a point that is the same distance from X as the point travel
          if (polygonPoints[point][0] === axisx) {
            // if find a point of the polygon that is at the same height on the X axis as the point
            // console.log('vertice:'+polygonPoints[point]);
            if (point + 1 === polygonPoints.length) {
              nextpoint = 0;
            } else {
              nextpoint = point + 1;
            } // connects the last point with the first one of the polygon
            // BORDER UP
            if (polygonPoints[point][1] >= y) {
              // if the polygon's found point is higher on the Y axis
              if (polygonPoints[point - 1][1] <= y && polygonPoints[point - 1][0] <= axisx) {
                // console.log('vertice ant:'+polygonPoints[point-1]);
                if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[point - 1][0]) {
                  lx = Math.abs(polygonPoints[point][0] - polygonPoints[point - 1][0]);
                  ly = Math.abs(polygonPoints[point][1] - polygonPoints[point - 1][1]);
                  angle = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angle1: ${angle}`);
                  lx = Math.abs(polygonPoints[point][0] - x);
                  ly = Math.abs(polygonPoints[point][1] - y);
                  anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angle point1: ${anglePoint}`);
                  if (anglePoint > angle) {
                    borders -= 1;
                  }
                }
                borders += 1;
                console.log('1');
              } else if (polygonPoints[nextpoint][1] <= y && polygonPoints[nextpoint][0] <= axisx) {
                // if the previous or next point of the point found is below the point on the Y axis and behind the X axis of the current point and in front of X
                if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[nextpoint][0]) {
                  lx = Math.abs(polygonPoints[point][0] - polygonPoints[nextpoint][0]);
                  ly = Math.abs(polygonPoints[point][1] - polygonPoints[nextpoint][1]);
                  // var h = Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2));
                  // var angle = Math.asin((ly*Math.sin(Math.PI/2))/h);
                  angle = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angleulo2: ${angle}`);
                  lx = Math.abs(polygonPoints[point][0] - x);
                  ly = Math.abs(polygonPoints[point][1] - y);
                  // h = Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2));
                  // var anglePoint = Math.asin((ly*Math.sin(Math.PI/2))/h);
                  anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angleulo point2: ${anglePoint}`);
                  if (anglePoint > angle) {
                    borders -= 1;
                  }
                }
                borders += 1;
                console.log(`point: ${point}`);
                console.log(`verticeX: ${polygonPoints[point - 1][0]}`);
              }
            } else if (polygonPoints[point][1] < y) {
              // BORDER DOWN
              // if the found point of the polygon is lower on the Y axis
              if (polygonPoints[point - 1][1] >= y && polygonPoints[point - 1][0] <= axisx) {
                // if the previous or next point of the point found are above the point on the Y axis & back on the X axis
                if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[point - 1][0]) {
                  lx = Math.abs(polygonPoints[point][0] - polygonPoints[point - 1][0]);
                  ly = Math.abs(polygonPoints[point][1] - polygonPoints[point - 1][1]);
                  angle = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angleulo1: ${angle}`);
                  lx = Math.abs(polygonPoints[point][0] - x);
                  ly = Math.abs(polygonPoints[point][1] - y);
                  anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angleulo point1: ${anglePoint}`);
                  if (anglePoint > angle) {
                    borders -= 1;
                  }
                }
                borders += 1;
                console.log('2');
              } else if (polygonPoints[nextpoint][1] >= y && polygonPoints[nextpoint][0] <= axisx) {
                if (borders === 0 && x <= polygonPoints[point][0] && x > polygonPoints[nextpoint][0]) {
                  lx = Math.abs(polygonPoints[point][0] - polygonPoints[nextpoint][0]);
                  ly = Math.abs(polygonPoints[point][1] - polygonPoints[nextpoint][1]);
                  angle = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angleulo1: ${angle}`);
                  lx = Math.abs(polygonPoints[point][0] - x);
                  ly = Math.abs(polygonPoints[point][1] - y);
                  anglePoint = Math.atan(ly / lx) * (180 / Math.PI);
                  console.log(`angleulo point1: ${anglePoint}`);
                  if (anglePoint > angle) {
                    borders -= 1;
                  }
                }
                borders += 1;
                console.log(`point2: ${point}`);
              }
            }
          }
        }
      }
    }

    console.log(`cross borders: ${borders}`);
    if (borders % 2 === 0) {
      console.log('The point is outside the polygon');
    } else {
      console.log('The point is inside the polygon');
    }
    rl.close();
  });
});
