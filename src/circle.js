const circle = [19.729378, -101.175365];
const r = 3;
const lat1 = circle[0];
const lon1 = circle[1];
let lat2;
let lon2;
const radius = 6371; // radius of the earth in km
// equatorial radius=6378km  polar radius=6357km  equivolume radius=6371km

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('enter the latitude of the point: ', (answer1) => {
  if (Number.isNaN(answer1) || answer1 < -90 || answer1 > 90) console.log('it is not a valid coordinate');
  else {
    lat2 = answer1;
    console.log(`lat=${lat2}`);
  }
  rl.question('enter the longitude of the point: ', (answer2) => {
    if (Number.isNaN(answer2) || answer2 < -180 || answer2 > 180) console.log('it is not a valid coordinate');
    else {
      lon2 = answer2;
      console.log(`lon=${lon2}`);
    }

    // //////////Haversine formula
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
      (Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2));
    const c = 2 * Math.asin(Math.sqrt(a));
    const distance = radius * c;
    console.log(`distance from the center of the circle to the point: ${distance}`);

    if (distance <= r) {
      // if the distance from the center of the circle to the point is less than or equal to the radius of the circle, the point is inside
      console.log('the point is inside the circle');
    } else {
      console.log('the point is outside the circle');
    }
    rl.close();
  });
});
