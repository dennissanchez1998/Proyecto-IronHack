//constantes
const canvas = document.getElementById('juego');
const context = canvas.getContext('2d');
const nave = new Image();
nave.src = './images/imagen1.png';
const espacio = new Image();
espacio.src = './images/imagen4.jpg';
const disparo = new Image();
disparo.src = "./images/disparo_bueno.png"





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

//Shot



//funciones


//Jugador
const player = {
    height: 100,
    width: 100,
    x: 550,
    y: 440,
    dx: 0,
    dy: 0,
    speed: 20,



    imagenes() {
        context.drawImage(nave, this.x, this.y, this.width, this.height);
    },
    newPos() {
        this.x += this.dx;

    },
    detectWalls() {
        if (player.x < 0) {
            player.x = 0;
        }

        if ((player.x + player.width) > canvas.width) {
            player.x = (canvas.width - player.width);

        }

    },


}

const shoot = {
    height: 15,
    width: 15,
    x: 550,
    y: 390,

    imagen() {

        context.drawImage(disparo, 585, 390, 15, 15);

    }


}

const moveRight = () => {

    player.dx += player.speed;
}
const moveLeft = () => {

    player.dx -= player.speed;
}
const keyUp = () => {
    player.dx = 0;
}

const keyDown = (event) => {

    switch (event.key) {
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        default:
            return;
    }

}



const startGame = () => {
    Bg.move();
    Bg.draw();

    shoot.imagen();
    player.imagenes();
    player.newPos();
    player.detectWalls();
    requestAnimationFrame(startGame);

}
startGame();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);