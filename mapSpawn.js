function prepareGame() {
    firstClick = true;
    grid = [];
    gameover = false;
    mode = document.getElementById("size").value;
    sizeX = sizes[mode][0];
    sizeY = sizes[mode][1];
    s = height / sizeY;
    for (let i = 0; i < sizeY; i++) {
        grid.push([]);
    }
    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            grid[y][x] = (new cell(x * s, y * s, s));
        }
    }
    resizeCanvas(sizeX * s, height);
    document.getElementById("marks").innerHTML = "0/" + mines[mode];
    marks = 0;
}

function createGame(firstx, firsty) {
    for (let i = 0; i < mines[mode]; i++) {
        let x = int(random(sizeX));
        let y = int(random(sizeY));
        if (grid[y][x].content == -1 || near(x, y, firstx, firsty)) {
            i--;
        } else {
            grid[y][x].content = -1;
        }
    }
    for (let y = 0; y < sizeY; y++) {
        for (let x = 0; x < sizeX; x++) {
            if (grid[y][x].content != -1) {
                grid[y][x].content = (countFlags(x, y));
            }
        }
    }
    clearZone(firstx, firsty);
}

function near(x, y, firstx, firsty) {
    //La misma
    if (x == firstx && y == firsty) {
        return true;
    }
    //arriba
    if (x == firstx && y == firsty - 1) {
        return true;
    }
    //abajo
    if (x == firstx && y == firsty + 1) {
        return true;
    }
    //izq
    if (x == firstx - 1 && y == firsty) {
        return true;
    }
    //der
    if (x == firstx + 1 && y == firsty) {
        return true;
    }
    //arr-izq
    if (x == firstx - 1 && y == firsty - 1) {
        return true;
    }
    //arr-der
    if (x == firstx + 1 && y == firsty - 1) {
        return true;
    }
    //abaj-izq
    if (x == firstx - 1 && y == firsty + 1) {
        return true;
    }
    //abaj-der
    if (x == firstx + 1 && y == firsty + 1) {
        return true;
    }
    return false;
}

function countFlags(x, y) {
    let c = 0;
    //arriba
    if (y - 1 >= 0) {
        if (grid[y - 1][x].content == -1) {
            c++;
        }
    }
    //abajo
    if (y + 1 < sizeY) {
        if (grid[y + 1][x].content == -1) {
            c++;
        }
    }
    //izq
    if (x - 1 >= 0) {
        if (grid[y][x - 1].content == -1) {
            c++;
        }
    }
    //der
    if (x + 1 < sizeX) {
        if (grid[y][x + 1].content == -1) {
            c++;
        }
    }
    //arr-izq
    if (y - 1 >= 0 && x - 1 >= 0) {
        if (grid[y - 1][x - 1].content == -1) {
            c++;
        }
    }
    //arr-der
    if (y - 1 >= 0 && x + 1 < sizeX) {
        if (grid[y - 1][x + 1].content == -1) {
            c++;
        }
    }
    //abaj-izq
    if (y + 1 < sizeY && x - 1 >= 0) {
        if (grid[y + 1][x - 1].content == -1) {
            c++;
        }
    }
    //abaj-der
    if (y + 1 < sizeY && x + 1 < sizeX) {
        if (grid[y + 1][x + 1].content == -1) {
            c++;
        }
    }
    return c;
}

function clearZone(x, y) {
    let possibles = dimePos(x, y);
    let nextpos = [];
    for (let i = 0; i < possibles.length; i++) {
        let xind = possibles[i][0];
        let yind = possibles[i][1];
        if (grid[yind][xind].clicked == false && grid[yind][xind].content == 0) {
            nextpos.push([xind, yind]);
        }
        grid[yind][xind].clicked = true;
    }
    for (let i = 0; i < nextpos.length; i++) {
        clearZone(nextpos[i][0], nextpos[i][1]);
    }
}

function dimePos(x, y) {
    let pos = [];
    //arriba
    if (y - 1 >= 0) {
        pos.push([x, y - 1]);
    }
    //abajo
    if (y + 1 < sizeY) {
        pos.push([x, y + 1]);
    }
    //izq
    if (x - 1 >= 0) {
        pos.push([x - 1, y]);
    }
    //der
    if (x + 1 < sizeX) {
        pos.push([x + 1, y]);
    }
    //arr-izq
    if (y - 1 >= 0 && x - 1 >= 0) {
        pos.push([x - 1, y - 1]);
    }
    //arr-der
    if (y - 1 >= 0 && x + 1 < sizeX) {
        pos.push([x + 1, y - 1]);
    }
    //abaj-izq
    if (y + 1 < sizeY && x - 1 >= 0) {
        pos.push([x - 1, y + 1]);
    }
    //abaj-der
    if (y + 1 < sizeY && x + 1 < sizeX) {
        pos.push([x + 1, y + 1]);
    }
    return pos;
}

