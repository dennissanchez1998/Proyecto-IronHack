/* 
**********************************8

Constatentes ultilizadas
***************************8****


*/

const canvas = document.getElementById('juego');
const context = canvas.getContext('2d');
let nave = new Image();
nave.src = './images/imagen2.png';
const espacio = new Image();
espacio.src = './images/imagen4.jpg';
let bala = new Image();
bala.src = './images/bala3.png';
let balae = new Image();
balae.src = './images/fueguitoazul.png';
let enemigo = new Image();
enemigo.src = './images/bichofeo1.png';

let ganaste = new Image();
ganaste.src = './images/ganaste.png';
let perdiste = new Image();
perdiste.src = './images/perdiste.png';

let btnInicio = new Image();
btnInicio.src = './images/inicio.png';
let btnVolver = new Image();
btnVolver.src = './images/volver.png';

const startBtn = {
    x: 295,
    y: 300,
    w: 200,
    h: 100
}



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
var enemigosVivos = 18;
var tiempoDisparo = 900;
var id;
var endGame = false;
var totalBestScoresToShow = 5;
var puntos = 0;
var nivel = 0;
var punto = 5
var dificultad = 2;
var trucos = 65;
var trucos2 = 83;
var trucos3 = 68;
var truco = false;


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

function Enemigo(x, y, img) {
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
    this.img = img

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
                    gameOver()
                }
                this.x += this.dx;
                this.y += dificultad;
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

        if (nivel === 0) {
            context.save();
            context.fillStyle = "red";
            context.fillRect(this.x, this.y, this.w, 20);
            this.y = this.y + 4;
            context.restore();

        } else {
            context.drawImage(balae, this.x, this.y, 35, 35);

            this.y = this.y + 4;
        }

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
document.addEventListener("click", function(evt) {
    console.log(evt);


    let rect = canvas.getBoundingClientRect(); // OBTIENE DE RETORNO EL TAMA??O DEL ELEMENTO Y SU POSICI??N AL VIEWPORT, ES DECIR EL CANVAS *
    let clickX = evt.clientX - rect.left;
    let clickY = evt.clientY - rect.top;



    // SI LLEG?? A ATINARLE AL START BUTTON...
    if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h && endGame === true && enemigosVivos == 0) {
        console.log("Ganaste");
        reset();
        game.inicio();
    }
    if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h && endGame === true && enemigosVivos > 0) {
        console.log("Perdiste");
        reset();
        startGame();
    }


});


/* 
*************************8
Funcion que resetea los parametros
***********************
*/




function reset() {
    balae.src = './images/fueguitoazul.png';
    enemigo.src = './images/bichofeo1.png';
    endGame = false;
    tiempoDisparo = 900;
    enemigosVivos = 18;
    puntos = 0;
    nivel = 0;
    punto = 5;
    dificultad = 2;
}

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
    //Verifica ca??on

    if (x > canvas.width - 80) {

        x = canvas.width - 80;

    }

    if (x < 0) {
        x = 0;
    }


    /* 
    ****************
trucos para mostrar los diferentes niveles
    ***************
    
    */
    if (tecla[trucos]) {
        if (nivel === 0) {
            for (var i = 0; i < ovnis_array.length; i++) {
                enemigo2 = ovnis_array[i];
                enemigosVivos = 0;
                ovnis_array[i] = null;
                nivel = 1

            }

        }


    }

    if (tecla[trucos2]) {


        for (var i = 0; i < ovnis_array.length; i++) {
            enemigo2 = ovnis_array[i];
            enemigosVivos = 0;
            ovnis_array[i] = null;
            nivel = 2
            dificultad = 4
            tiempoDisparo = 300;
        }
    }

    if (tecla[trucos3]) {
        for (var i = 0; i < ovnis_array.length; i++) {
            enemigo2 = ovnis_array[i];
            enemigosVivos = 0;
            ovnis_array[i] = null;
            gameOver()

        }

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
    score();
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

    if (ovnis_array <= 10 && nivel === 0) {
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 1; j++) {
                ovnis_array.push(new Enemigo(10 + 80 * i, 10 + 55 * j, enemigo));
            }
            disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
        }




    }

    if (ovnis_array <= 10 && nivel === 1) {
        enemigo.src = './images/bichofeo5.png';
        for (var i = 0; i <= 8; i++) {
            disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
            for (var j = 0; j <= 2; j++) {
                ovnis_array.push(new Enemigo(10 + 80 * i, 10 + 55 * j));

            }

        }




    }

    if (ovnis_array <= 10 && nivel === 2) {
        enemigo.src = './images/bichofeo6.png';
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 4; j++) {
                ovnis_array.push(new Enemigo(10 + 80 * i, 10 + 55 * j));

            }

        }
        disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);




    }


}


/* 
**********************
Pinta el score en la pantalla
**********************

*/

function score() {
    context.save();
    context.fillStyle = "white";

    context.font = "bold 20px Courier";
    context.fillText("SCORE: " + puntos, 660, 520);
    context.restore();
}



//para comenzar el juego
const startGame = () => {

    if (endGame === false) {
        Bg.move();
        Bg.draw();
        prueba = new player(0);
        prueba.dibuja(x);
        ovnis();
        if (truco === false) {
            colisiones()
        }
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

                    puntos += punto;
                    if (enemigosVivos === 0 && nivel === 0) {
                        nivel += 1;
                        enemigosVivos = 27;
                        punto = 10;
                        tiempoDisparo = 800;
                    }
                    if (enemigosVivos === 0 && nivel === 1) {
                        nivel = 2
                        enemigosVivos = 45;
                        punto = 30;
                        dificultad = 4
                        tiempoDisparo = 500;
                    }
                    if (enemigosVivos === 0 && nivel === 2) {
                        gameOver();
                    }
                }
            }
        }
    }

    for (var j = 0; j < ovnis_array.length; j++) {
        ovnis2 = ovnis_array[j];
        if (ovnis2 != null) {
            if ((ovnis2.x >= prueba.x) &&
                (ovnis2.x <= prueba.x + prueba.w) &&
                (ovnis2.y >= prueba.y) &&
                (ovnis2.y <= prueba.y + prueba.h)) {
                gameOver();
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveFinalScore()
    balas_array = [];
    ovnis_array = [];

    balasEnemigas_array = [];
    if (enemigosVivos == 0) {
        context.drawImage(ganaste, 150, 20, 500, 300);
        context.drawImage(btnInicio, 295, 300, 200, 100);
    } else {
        context.drawImage(perdiste, 150, 20, 500, 300);
        context.drawImage(btnVolver, 295, 300, 200, 100);
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

/* 
startGame(); */


/* 
funcion para comenzar el juego

*/

var game = {


    /* 
    **********************
    BTN START GAME
    *****************
    */

    inicio: function() {

        let juegoI = document.getElementsByClassName("prueba");
        let navesI = document.getElementById('naves')
        let startI = document.getElementsByClassName("start");
        let inicioI = document.getElementById('inicio')
        inicioI.style.display = "block";
        startI[0].style.display = "flex"
        navesI.style.display = "none"

        juegoI[0].classList.add('div-juego');
    },


    /* 
    **********************
    BTN START GAME
    *****************
    */

    showLevelScreen: function() {


        let naves = document.getElementById('naves')
        let start = document.getElementsByClassName("start");
        let inicio = document.getElementById('inicio')
        start[0].style.display = "none"
        naves.style.display = "block"
    },


    /* 
    ***********************
    BTN SELECCION DE NAVE
    ***********************
    */

    nave: function(event) {
        let juego = document.getElementsByClassName("div-juego");

        let naves = event.toElement.alt;
        console.log(naves)
        switch (naves) {
            case "NLO":
                nave.src = './images/imagen1.png';
                inicio.style.display = "none";
                juego[0].classList.remove('div-juego');
                startGame();

                break;
            case "NLO2":
                nave.src = './images/imagen2.png';
                inicio.style.display = "none";
                juego[0].classList.remove('div-juego');
                startGame();
                break;
            case "NLO3":
                nave.src = './images/imagen3.png';
                inicio.style.display = "none";
                juego[0].classList.remove('div-juego');
                console.log(juego);
                startGame();
                break;


        }
    },



}


/* 
**********************
Mejores puntuaciones
**********************

*/


/* 
*************************
te devuelve la puntuacion total
************************

*/
function getTotalScore() {
    return puntos;
}


/* 
***************************
guarda la puntuacion final
***************************
*/

function saveFinalScore() {
    localStorage.setItem(getFinalScoreDate(), getTotalScore());
    showBestScores();
    removeNoBestScores();
}

/* 
***********************8
Realiza la fecha de la puntuacion final
**********************
*/

function getFinalScoreDate() {
    var date = new Date();
    console.log(fillZero(date.getDate()));
    return fillZero(date.getDate()) + '/' +
        fillZero(date.getMonth() + 1) + ' ' +
        fillZero(date.getHours()) + ':' +
        fillZero(date.getMinutes()) + ' ';
}

/* 
*******************8
agrega un cero al principio si la puntuacion es menor a 10
******************

*/

function fillZero(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

/* 
***********************
Funcion que trae los mejores scroes guardados en localstorage
********************

*/

function getBestScoreKeys() {
    var bestScores = getAllScores();
    bestScores.sort(function(a, b) { return b - a; });
    bestScores = bestScores.slice(0, totalBestScoresToShow);
    var bestScoreKeys = [];
    for (var j = 0; j < bestScores.length; j++) {
        var score = bestScores[j];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (parseInt(localStorage.getItem(key)) == score) {
                bestScoreKeys.push(key);
            }
        }
    }
    return bestScoreKeys.slice(0, totalBestScoresToShow);
}


/* 
**********************
Trae todos los los puntuajes guardado en local sotre
*************************
*/

function getAllScores() {
    var all = [];
    for (var i = 0; i < localStorage.length; i++) {
        all[i] = (localStorage.getItem(localStorage.key(i)));
    }
    return all;
}

/* 
****************************
Muesta los mejores resultador en el html
***************************
*/

function showBestScores() {
    var bestScores = getBestScoreKeys();
    var bestScoresList = document.getElementById('puntuaciones');
    if (bestScoresList) {
        clearList(bestScoresList);
        for (var i = 0; i < bestScores.length; i++) {
            addListElement(bestScoresList, bestScores[i], i == 0 ? 'negrita' : null);
            addListElement(bestScoresList, localStorage.getItem(bestScores[i]), i == 0 ? 'negrita' : null);
        }
    }
}

/* 
***********************
crea la lista en el html
**********************

*/

function clearList(list) {
    list.innerHTML = '';
    addListElement(list, "Fecha");
    addListElement(list, "Puntos");
}

/* 
****************************8
Agg las clases de ser necesarias
***************************
*/


function addListElement(list, content, className) {
    var element = document.createElement('li');
    if (className) {
        element.setAttribute("class", className);
    }
    element.innerHTML = content;
    list.appendChild(element);
}

// extendemos el objeto array con un metodo "containsElement"
Array.prototype.containsElement = function(element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
};

/* 
********************************
verifica si el puntuaje actual supera algunos de los resultados anterioes y lo elimina
*******************************
*/


function removeNoBestScores() {
    var scoresToRemove = [];
    var bestScoreKeys = getBestScoreKeys();
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!bestScoreKeys.containsElement(key)) {
            scoresToRemove.push(key);
        }
    }
    for (var j = 0; j < scoresToRemove.length; j++) {
        var scoreToRemoveKey = scoresToRemove[j];
        localStorage.removeItem(scoreToRemoveKey);
    }
}