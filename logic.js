let grid = [];
let sizes = [[8, 8], [10, 8], [16, 16], [18, 14], [24, 20], [30, 16]];
let mines = [10, 10, 40, 40, 99, 99];
let numbrs = [];
let gameover = false;
let sizeX, sizeY, s;
let mode;
let marks = 0;
let firstClick;
let auto = false;
let fRate = 5;

//Easy win rate: 0.666
//Medium win rate: 0.626
//Hard win rate: 0.03

let info = {
    wins: 0,
    gameovers: 0,
    total: 0
}

function preload() {
    flag = loadImage("images/flag.png");
    empty = loadImage("images/empty.png");
    bomb = loadImage("images/bomb.png");
    face = loadImage("images/face.png");
    img1 = loadImage("images/1.png");
    img2 = loadImage("images/2.png");
    img3 = loadImage("images/3.png");
    img4 = loadImage("images/4.png");
    img5 = loadImage("images/5.png");
    img6 = loadImage("images/6.png");
    img7 = loadImage("images/7.png");
    img8 = loadImage("images/8.png");
}

function setup() {
    let canvas = createCanvas(570, 570);
    canvas.parent("canvasContainer");
    numbrs.push(img1);
    numbrs.push(img2);
    numbrs.push(img3);
    numbrs.push(img4);
    numbrs.push(img5);
    numbrs.push(img6);
    numbrs.push(img7);
    numbrs.push(img8);
    //Preparar mapa
    prepareGame();
    //Evita popup al pulsar right click dentro del canvas
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    frameRate(100);
}

function draw() {
    frameRate(fRate);
    background(91);
    drawMap();
    if (auto) {
        if (!gameover) {
            autoplay();
        } else {
            let state = document.getElementById("state").innerHTML;
            if (state == "Victoria") {
                info.wins++;
            }
            if (state == "Game Over") {
                info.gameovers++;
            }
            info.total++;
            info.rate = (info.wins / info.total).toFixed(3);
            document.getElementById("wins").innerHTML = "Wins: " + info.wins;
            document.getElementById("gameovers").innerHTML = "Gameovers: " + info.gameovers;
            document.getElementById("total").innerHTML = "Total: " + info.total;
            document.getElementById("rate").innerHTML = "Rate: " + info.rate;
            prepareGame();
            auto = false;
        }
        document.getElementById("auto").style.backgroundColor = "green";
    } else {
        document.getElementById("auto").style.backgroundColor = "grey";
    }
    document.getElementById("frameRateText").innerHTML = "Framerate: " + fRate;
}

function drawMap() {
    //Marco del canvas
    strokeWeight(2);
    rect(1, 1, width - 2, height - 2);
    //Lineas horizontales
    for (let i = 0; i < sizeY; i++) {
        line(0, i * s, width, i * s);
    }
    //Lineas verticales
    for (let i = 0; i < sizeX; i++) {
        line(i * s, 0, i * s, height);
    }
    //Dibujar celdas
    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            grid[y][x].draw();
        }
    }
}

function mousePressed() {
    if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
        let x = int(mouseX / s);
        let y = int(mouseY / s);
        if (!gameover) {
            click(x, y, mouseButton);
        }
    }
}

function click(x, y, mouse) {
    if (mouse == "left") {
        grid[y][x].clicked = true;
        if (firstClick) {
            createGame(x, y);
            firstClick = false;
            document.getElementById("state").innerHTML = "A buscar minas!";
        } else {
            if (grid[y][x].content == 0) {
                clearZone(x, y);
            } else {
                if (grid[y][x].content == -1) {
                    gameover = true;
                    endGame("gameover");
                    document.getElementById("state").innerHTML = "Game Over";
                    info.gameovers++;
                }
            }
            if (checkWin()) {
                gameover = true;
                endGame("win");
                document.getElementById("state").innerHTML = "Victoria";
                info.wins++;
            }
        }
    }
    if (mouse == "right") {
        if (grid[y][x].clicked == false) {
            grid[y][x].marked = !grid[y][x].marked;
            if (grid[y][x].marked) {
                marks++;
            } else {
                marks--;
            }
            document.getElementById("marks").innerHTML = marks + "/" + mines[mode];
            if (checkWin()) {
                gameover = true;
                endGame("win");
                document.getElementById("state").innerHTML = "Victoria";
            }
        }
    }
}

function endGame(state) {
    if (state == "win") {
        console.log("win");
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].content == -1 && grid[i][j].clicked == false) {
                    grid[i][j].face = true;
                }
            }
        }
    }
    if (state == "gameover") {
        console.log("gameover");
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].content == -1 && grid[i][j].clicked == false) {
                    grid[i][j].clicked = true;
                }
            }
        }
    }
    drawMap();
}

function checkWin() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].content != -1 && grid[i][j].clicked == false) {
                return false;
            }
        }
    }
    return true;
}

function show() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].show = !grid[i][j].show;
        }
    }
}

function automatic() {
    auto = !auto;
}



