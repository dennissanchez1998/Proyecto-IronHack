//constantes

const canvas = document.getElementById('juego');
const context = canvas.getContext('2d');
const nave = new Image();
nave.src = './images/imagen1.png';
const espacio = new Image();
espacio.src = './images/imagen4.jpg';

//Variables

var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaEspacio = 32;
var teclaPulsada = null;
var tecla = [];
var x = 520;
var y = 100;
var tiempoBala = true;
var balas_array = new Array();




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

//Bala
function Bala(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.dibuja = function() {
        context.save();
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y, this.w, this.w);
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


function verifica(boton = false, codigo = 0) {
    if (boton) {
        teclaPulsada = codigo;
        tecla[codigo] = true;
    }
    if (tecla[teclaDerecha]) x += 10;
    if (tecla[teclaIzquierda]) x -= 10;
    //Verifica cañon
    console.log(x);
    if (x > 1100) {

        x = 1100;
        console.log("entro");
    }

    if (x < 0) {
        x = 0;
    }


    //Disparo
    if (tecla[teclaEspacio]) {
        if (tiempoBala == true) {
            tiempoBala = false;
            balas_array.push(new Bala(prueba.x + 48, prueba.y - 3, 5));
            tecla[teclaEspacio] = false;
            setTimeout(function() { tiempoBala = true; }, 300);
        }
    }
    if (boton) {

        tecla[codigo] = false;

    }
}



function pinta() {

    //Balas
    for (var i = 0; i < balas_array.length; i++) {
        if (balas_array[i] != null) {
            balas_array[i].dibuja();


        }
    }

}



const startGame = () => {
    Bg.move();
    Bg.draw();
    prueba = new player(0);
    prueba.dibuja(x);
    verifica();
    pinta();
    requestAnimationFrame(startGame);

}


startGame();