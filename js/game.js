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
var ultimos = new Array();
var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaEspacio = 32;
var teclaPulsada = null;
var tecla = [];
var x = 360;
var y = 100;
var tiempoBala = true;
var balas_array = new Array();
var ovnis_array = new Array();
var balasEnemigas_array = new Array();
var disparoEnemigo;
var enemigosVivos = 50;
var tiempoDisparo = 1000;
var id;
var endGame = false;


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

function getRandomNumber(range) {
    return Math.floor(Math.random() * range);
}

function Enemigo(x, y) {
    this.x = x;
    this.y = y;
    this.w = 60;
    this.veces = 0;
    this.dx = 5;
    this.ciclos = 0;
    this.num = 14;
    this.figura = true;
    this.vive = true;
    this.speed = 1

    this.prueba = false;
    this.dibuja = function() {

        if (this.ciclos > 20) {
            //saltitos
            if (this.veces > this.num) {
                this.dx *= -1;
                this.veces = 0;
                this.num = 5;
                this.y += 20;
                this.dx = (this.dx > 0) ? this.dx++ : this.dx--;
            } else {
                if (this.y >= canvas.height) {
                    this.y = 0;
                }
                this.x += this.dx;
                this.y += 2;
            }
            this.veces++;
            this.ciclos = 0;
            this.figura = !this.figura;
        } else {
            this.ciclos++;
        }


        context.drawImage(enemigo, this.x, this.y, this.w, this.w);


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

    if (x > canvas.width - 80) {

        x = canvas.width - 80;

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

    //Balas Enemigas
    for (var i = 0; i < balasEnemigas_array.length; i++) {
        if (balasEnemigas_array[i] != null) {
            balasEnemigas_array[i].dispara();
            if (balasEnemigas_array[i].y > canvas.height) balasEnemigas_array[i] = null;
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
Aparecer OVNIS
*/
function ovnis() {

    if (ovnis_array <= 10) {

        for (var i = 0; i <= 8; i++) {
            disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
            for (var j = 0; j <= 1; j++) {
                ovnis_array.push(new Enemigo(10 + 80 * i, 10 + 55 * j));

            }
        }




    }

}


//para comenzar el juego
const startGame = () => {

    if (endGame === false) {
        Bg.move();
        Bg.draw();
        prueba = new player(0);
        prueba.dibuja(x);
        ovnis();
        colisiones()
        verifica();
        pinta();
        id = requestAnimationFrame(startGame);
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

    for (var j = 0; j < balasEnemigas_array.length; j++) {
        bala3 = balasEnemigas_array[j];
        if (bala3 != null) {
            if ((bala3.x >= prueba.x) &&
                (bala3.x <= prueba.x + prueba.w) &&
                (bala3.y >= prueba.y) &&
                (bala3.y <= prueba.y + prueba.h)) {
                gameOver();
            }
        }
    }



}

/* 
**********************
Mensajes
**********************

*/

function mensaje(cadena) {
    var lon = (canvas.width - (50 * cadena.length)) / 2;
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 75px Arial";
    context.fillText(cadena, lon, 220);
}


/* 
****************
se acaba el juego
****************

*/

function gameOver() {
    cancelAnimationFrame(id)
    context.clearRect(0, 0, canvas.width, canvas.height);
    balas_array = [];
    ovnis_array = [];
    balasEnemigas_array = [];
    if (enemigosVivos == 0) {
        mensaje("GANASTE");
    } else {
        mensaje("GAME OVER");
    }
    endGame = true;
    clearTimeout(disparoEnemigo);
}


/* 
*****************
todos los disparo de enemigo
*****************
*/

function disparaEnemigo() {
    for (var i = ovnis_array.length - 1; i > 0; i--) {
        if (ovnis_array[i] != null) {
            ultimos.push(i);
        }
        if (ultimos.length >= 10) break;
    }
    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
    ovnis_array.clean(undefined);
    d = ultimos[Math.floor(Math.random() * ovnis_array.length)];
    if (ovnis_array[d] == null || d == null) {
        ovnis_array.clean(undefined);
        d = Math.floor(Math.random() * ovnis_array.length);
    }
    balasEnemigas_array.push(new Bala(ovnis_array[d].x + ovnis_array[d].w / 2, ovnis_array[d].y, 5));
    clearTimeout(disparoEnemigo);
    disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
}


startGame();
window.onload = function() {


    console.log("entro primro por aqui");

}