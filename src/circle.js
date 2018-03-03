var circulo = [19.729378, -101.175365];
var r = 3;
var lat1 = circulo[0];
var lon1 = circulo[1];
var lat2;
var lon2;
var radio = 6371; //radio de la tierra en km
// radio ecuatorial=6378km	radio polar=6357km	radio equivolumen=6371km

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('ingresa la latitud del punto: ', function(respuesta1) {
  if (isNaN(respuesta1) || respuesta1 < -90 || respuesta1 > 90) console.log('no es una coordenada valida');
  else {
    //x = 19.702562;
    lat2 = respuesta1;
    console.log('lat=' + lat2);
  }
  rl.question('ingresa la longitud del punto: ', function(respuesta2) {
    if (isNaN(respuesta2) || respuesta2 < -180 || respuesta2 > 180) console.log('no es una coordenada valida');
    else {
      //y = -101.191617;
      lon2 = respuesta2;
      console.log('lon=' + lon2);
    }

    ////////////formula de Haversine
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var distancia = radio * c;
    console.log('distancia del centro del circulo al punto: ' + distancia);

    if (distancia <= r) {
      //si la distancia del centro del circulo al punto es menor o igual al radio del circulo entonces el punto esta dentro
      console.log('el punto esta dentro del circulo');
    } else {
      console.log('el punto esta fuera del circulo');
    }
    rl.close();
  });
});
