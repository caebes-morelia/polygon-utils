const circulo = [19.729378, -101.175365];
const r = 3;
const lat1 = circulo[0];
const lon1 = circulo[1];
let lat2;
let lon2;
const radio = 6371; // radio de la tierra en km
// radio ecuatorial=6378km radio polar=6357km radio equivolumen=6371km

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('ingresa la latitud del punto: ', (respuesta1) => {
  if (isNaN(respuesta1) || respuesta1 < -90 || respuesta1 > 90) console.log('no es una coordenada valida');
  else {
    // x = 19.702562;
    lat2 = respuesta1;
    console.log(`lat=${lat2}`);
  }
  rl.question('ingresa la longitud del punto: ', (respuesta2) => {
    if (isNaN(respuesta2) || respuesta2 < -180 || respuesta2 > 180) console.log('no es una coordenada valida');
    else {
      // y = -101.191617;
      lon2 = respuesta2;
      console.log(`lon=${lon2}`);
    }

    // //////////formula de Haversine
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
      (Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2));
    const c = 2 * Math.asin(Math.sqrt(a));
    const distancia = radio * c;
    console.log(`distancia del centro del circulo al punto: ${distancia}`);

    if (distancia <= r) {
      // si la distancia del centro del circulo al punto es menor o igual al radio del circulo entonces el punto esta dentro
      console.log('el punto esta dentro del circulo');
    } else {
      console.log('el punto esta fuera del circulo');
    }
    rl.close();
  });
});
