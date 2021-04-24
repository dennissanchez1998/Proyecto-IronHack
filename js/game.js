//constantes
const canvas = document.getElementById('juego');
const context = canvas.getContext('2d');
const nave = new Image();
nave.src = './images/nave1.png';
const espacio = new Image();
espacio.src = './images/espacio.jpg';





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
function Shot(x, y, array, img) {
    this.x = x;
    this.x = y;
    this.image = img;
    this.speed = shotSpeed;
    this.identifier = 0;
    this.add = function() {
        array.push(this);
    };
    this.deleteShot = function(idendificador) {
        arrayRemove(array, idendificador);
    };
}



//funciones


//Jugador
const player = {
    height: 80,
    width: 80,
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


    player.imagenes();
    player.newPos();
    player.detectWalls();
    requestAnimationFrame(startGame);

}
startGame();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);