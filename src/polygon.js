//var puntos_pologono = [][];
var puntos_poligono = [[1, 3], [3, 3], [4, 4], [6, 4], [7, 3], [8, 5], [5, 7], [4, 5], [2, 6]]; //sol los puntos que forman el poligono
var ordenar_ejex = puntos_poligono.slice();
ordenar_ejex.sort(); //son los puntos del poligono pero ordenados de menor a mayor en el eje de las X

var liminx = ordenar_ejex[0][0],
  limaxx = ordenar_ejex[ordenar_ejex.length - 1][0],
  liminy = 1000,
  limaxy = -1000;

for (var c = 0; c < puntos_poligono.length; c++) {
  if (puntos_poligono[c][1] < liminy) {
    liminy = puntos_poligono[c][1];
  } else if (puntos_poligono[c][1] > limaxy) {
    //encuentra el limite minimo en Y
    limaxy = puntos_poligono[c][1];
  } //encuentra el limite maximo en Y
}

for (var c = 1; c < ordenar_ejex.length; c++) {
  if (ordenar_ejex[c][0] == ordenar_ejex[c - 1][0]) {
    ordenar_ejex.splice(c, 1);
  } //busca numeros repetidos en eje X
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var x;
var y;
var puntosig;
var fronteras = 0;
var lx;
var ly;
var ang;
var ang_punto;
rl.question('ingresa la cordenada X del punto: ', function(respuesta) {
  x = respuesta;
  rl.question('ingresa la cordenada en Y del punto: ', function(respuesta2) {
    y = respuesta2;

    if (x > liminx && x < limaxx && y > liminy && y < limaxy) {
      //si el punto esta dentro de los limites del poligono
      var i;
      for (i = 0; i < ordenar_ejex.length; i++) {
        if (x <= ordenar_ejex[i][0]) {
          break;
        }
      } //define a partir de donde va a pintar la linea en el eje X

      for (var ejex; i < ordenar_ejex.length; i++) {
        //el punto se va recorriendo en el eje X para ver cuantas fronteras cruza
        ejex = ordenar_ejex[i][0]; //console.log('ejex: '+ejex);
        for (var punto = 0; punto < puntos_poligono.length; punto++) {
          //busca en el arreglo de puntos del poligono un punto que este a la misma distancia de X que el recorrido del punto
          if (puntos_poligono[punto][0] == ejex) {
            //si se encuentra punto del poligono q este en la misma altura en eje X que el punto
            //console.log('vertice:'+puntos_poligono[punto]);
            if (punto + 1 == puntos_poligono.length) {
              puntosig = 0;
            } else {
              puntosig = punto + 1;
            } //conecta el ultimpo punto con el primero del poligono
            /*fron arriba*/ if (puntos_poligono[punto][1] >= y) {
              //si el punto encontrado del poligono esta mas arriba en eje Y
              if (puntos_poligono[punto - 1][1] <= y && puntos_poligono[punto - 1][0] <= ejex) {
                //console.log('vertice ant:'+puntos_poligono[punto-1]);
                if (fronteras == 0 && x <= puntos_poligono[punto][0] && x > puntos_poligono[punto - 1][0]) {
                  lx = Math.abs(puntos_poligono[punto][0] - puntos_poligono[punto - 1][0]);
                  ly = Math.abs(puntos_poligono[punto][1] - puntos_poligono[punto - 1][1]);
                  ang = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo1: ' + ang);
                  lx = Math.abs(puntos_poligono[punto][0] - x);
                  ly = Math.abs(puntos_poligono[punto][1] - y);
                  ang_punto = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo punto1: ' + ang_punto);
                  if (ang_punto > ang) {
                    fronteras--;
                  }
                }
                fronteras++;
                console.log('1');
              } else if (puntos_poligono[puntosig][1] <= y && puntos_poligono[puntosig][0] <= ejex) {
                //si el punto anterior o el siguiente del punto encontrado estan debajo del punto en eje Y & detras en eje X del punto actual y delante de X
                if (fronteras == 0 && x <= puntos_poligono[punto][0] && x > puntos_poligono[puntosig][0]) {
                  lx = Math.abs(puntos_poligono[punto][0] - puntos_poligono[puntosig][0]);
                  ly = Math.abs(puntos_poligono[punto][1] - puntos_poligono[puntosig][1]);
                  //var h = Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2));
                  //var ang = Math.asin((ly*Math.sin(Math.PI/2))/h);
                  ang = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo2: ' + ang);
                  lx = Math.abs(puntos_poligono[punto][0] - x);
                  ly = Math.abs(puntos_poligono[punto][1] - y);
                  //h = Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2));
                  //var ang_punto = Math.asin((ly*Math.sin(Math.PI/2))/h);
                  ang_punto = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo punto2: ' + ang_punto);
                  if (ang_punto > ang) {
                    fronteras--;
                  }
                }
                fronteras++;
                console.log('punto: ' + punto);
                console.log('verticeX: ' + puntos_poligono[punto - 1][0]);
              }
            } else if (puntos_poligono[punto][1] < y) {
              /*fron abajo*/ //si el punto encontrado del poligono esta mas abajo en eje Y
              if (puntos_poligono[punto - 1][1] >= y && puntos_poligono[punto - 1][0] <= ejex) {
                //si el punto anterior o el siguiente del punto encontrado estan arriba del punto en eje Y & detras en eje X
                if (fronteras == 0 && x <= puntos_poligono[punto][0] && x > puntos_poligono[punto - 1][0]) {
                  lx = Math.abs(puntos_poligono[punto][0] - puntos_poligono[punto - 1][0]);
                  ly = Math.abs(puntos_poligono[punto][1] - puntos_poligono[punto - 1][1]);
                  ang = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo1: ' + ang);
                  lx = Math.abs(puntos_poligono[punto][0] - x);
                  ly = Math.abs(puntos_poligono[punto][1] - y);
                  ang_punto = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo punto1: ' + ang_punto);
                  if (ang_punto > ang) {
                    fronteras--;
                  }
                }
                fronteras++;
                console.log('2');
              } else if (puntos_poligono[puntosig][1] >= y && puntos_poligono[puntosig][0] <= ejex) {
                if (fronteras == 0 && x <= puntos_poligono[punto][0] && x > puntos_poligono[puntosig][0]) {
                  lx = Math.abs(puntos_poligono[punto][0] - puntos_poligono[puntosig][0]);
                  ly = Math.abs(puntos_poligono[punto][1] - puntos_poligono[puntosig][1]);
                  ang = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo1: ' + ang);
                  lx = Math.abs(puntos_poligono[punto][0] - x);
                  ly = Math.abs(puntos_poligono[punto][1] - y);
                  ang_punto = Math.atan(ly / lx) * 180 / Math.PI;
                  console.log('angulo punto1: ' + ang_punto);
                  if (ang_punto > ang) {
                    fronteras--;
                  }
                }
                fronteras++;
                console.log('punto2: ' + punto);
              }
            }
          }
        }
      }
    }

    console.log('fronteras cruzadas: ' + fronteras);
    if (fronteras % 2 == 0) {
      console.log('El punto esta fuera del poligono');
    } else {
      console.log('El punto esta dentro del poligono');
    }
    rl.close();
  });
});
