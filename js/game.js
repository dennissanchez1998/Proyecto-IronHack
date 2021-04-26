/* 
**********************************8

Constatentes ultilizadas
***************************8****


*/

const canvas = document.getElementById('juego');
const context = canvas.getContext('2d');
const nave = new Image();
nave.src = './images/imagen2.png';
const espacio = new Image();
espacio.src = './images/imagen4.jpg';
const bala = new Image();
bala.src = './images/bala3.png';

const enemigo = new Image();
enemigo.src = './images/bichofeo1.png';




/* 
****************************
Variables ultilizadas
**************************
*/
var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaEspacio = 32;
var teclaPulsada = null;
var tecla = [];
var x = 520;
var y = 100;
var tiempoBala = true;
var balas_array = new Array();
var ovnis_array = new Array();
var disparoEnemigo;
var enemigosVivos = 50;


/* 
*****************************
Aqui se crea el bg
************************

*/

//imagen de fondo Canvas
const Bg = {
    img: espacio,
    x: 0,
    y: 0,
    speed: 1,
    move: function() {
        this.y += this.speed;
        this.y %= canvas.height;
    },
    draw: function() {
        context.drawImage(this.img, 0, this.y, canvas.width, canvas.height);
        context.drawImage(this.img, 0, this.y - canvas.height, canvas.width, canvas.height);
    }
}



//Jugador

/* 
***********************************
Aqui se crea el jugador
***********************************

*/
class player {

    constructor(x) {
        this.x = x;
        this.y = 440;
        this.w = 100;
        this.h = 100;

    }

    dibuja(x) {

        this.x = x;

        context.drawImage(nave, this.x, this.y, this.w, this.h);
    };
}

/* 
********************
Aqui se crea el enemigo
********************

*/


function Enemigo(x, y) {
    this.x = x;
    this.y = y;
    this.w = 35;
    this.veces = 0;
    this.dx = 5;
    this.ciclos = 0;
    this.num = 14;
    this.figura = true;
    this.vive = true;
    this.dibuja = function() {

        context.drawImage(enemigo, x, y, 60, 60);


    };
}

/* 
*****************
Aqui se crean las balas del jugador y del mostros
****************
*/
//Bala
function Bala(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.dibuja = function() {
        context.save();
        /*        context.fillStyle = "blue";
               context.fillRect(this.x, this.y, this.w, this.w); */
        context.drawImage(bala, this.x, this.y, this.w, this.w);
        this.y = this.y - 6;
        context.restore();
    };
    this.dispara = function() {
        context.save();
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.w, this.w);
        this.y = this.y + 4;
        context.restore();
    };
}

/*************
LISTENER
**************/
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 17); }
})();
document.addEventListener("keydown", function(e) {
    teclaPulsada = e.keyCode;;
    tecla[e.keyCode] = true;
});
document.addEventListener("keyup", function(e) {
    tecla[e.keyCode] = false;
});

/* **********
Verifica las letras marcadas
***********
*/
function verifica(boton = false, codigo = 0) {
    if (boton) {
        teclaPulsada = codigo;
        tecla[codigo] = true;
    }
    if (tecla[teclaDerecha]) x += 10;
    if (tecla[teclaIzquierda]) x -= 10;
    //Verifica cañon

    if (x > 1100) {

        x = 1100;

    }

    if (x < 0) {
        x = 0;
    }


    /* 
    ***********************************
    Disparar cada vez que se presione la tecla espacio
    ************************8
    */
    if (tecla[teclaEspacio]) {
        if (tiempoBala == true) {
            tiempoBala = false;
            balas_array.push(new Bala(prueba.x + 30, prueba.y - 3, 45));
            tecla[teclaEspacio] = false;
            setTimeout(function() { tiempoBala = true; }, 300);
        }
    }
    if (boton) {

        tecla[codigo] = false;

    }
}

/* 
***************************************
Pinta las balas y el enemigo
********************************
*/

function pinta() {

    //Balas
    for (var i = 0; i < balas_array.length; i++) {
        if (balas_array[i] != null) {
            balas_array[i].dibuja();


        }
    }

    //enemigos

    numEnemigos = 0;
    for (var i = 0; i < ovnis_array.length; i++) {
        if (ovnis_array[i] != null) {
            ovnis_array[i].dibuja();
            numEnemigos++;
        }
    }


}



/* 
********************************8
para saber si murio un enemigo o tu jugador
*********************************
*/

function colisiones() {
    for (var i = 0; i < ovnis_array.length; i++) {
        for (var j = 0; j < balas_array.length; j++) {
            enemigo2 = ovnis_array[i];
            bala2 = balas_array[j];
            if (enemigo2 != null && bala2 != null) {
                if ((bala2.x >= enemigo2.x) &&
                    (bala2.x <= enemigo2.x + enemigo2.w) &&
                    (bala2.y >= enemigo2.y) &&
                    (bala2.y <= enemigo2.y + enemigo2.w)) {
                    enemigo2.vive = false;
                    enemigosVivos = enemigosVivos - 1;
                    ovnis_array[i] = null;
                    balas_array[j] = null;


                }
            }
        }
    }

}


//para comenzar el juego
const startGame = () => {
    Bg.move();
    Bg.draw();
    prueba = new player(0);
    prueba.dibuja(x);
    /*     enemigo2 = new Enemigo(50, 50);
        enemigo2.dibuja(); */

    if (ovnis_array <= 10) {

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 20; j++) {
                ovnis_array.push(new Enemigo(100 + 40 * j, 30 + 45 * i));
            }
        }

    }
    colisiones()
    verifica();
    pinta();
    requestAnimationFrame(startGame);

}


startGame();