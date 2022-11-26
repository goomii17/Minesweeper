function autoplay() {
    if (firstClick) {
        //Pick one randomly and click it
        click(floor(random(sizeX)), floor(random(sizeY)), "left");
    } else if (!gameover) {
        let posMines2 = [];
        //Step 1: Find obvious mines, mark them, and click secure places
        //For every cell wich is a number and is vissible
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let n = grid[i][j].content;
                if (n != -1 && n != 0 && grid[i][j].clicked == true) {
                    //Find possible mines
                    let posMines = [];
                    let possibles = dimePos(j, i);
                    let marks = 0;
                    for (let k = 0; k < possibles.length; k++) {
                        let x = possibles[k][0];
                        let y = possibles[k][1];
                        //If not vissible       and   is not marked, add it
                        if (!grid[y][x].clicked && !grid[y][x].marked) {
                            posMines.push([x, y]);
                            //Prepare for step 2
                            if (!alredyThere(posMines2, [x, y])) {
                                posMines2.push([x, y]);
                            }
                        }
                        //Count number of surrounding marks
                        if (grid[y][x].marked) {
                            marks++;
                        }
                    }
                    //If number of possible mines equals number of reminder mines, every cell is a mine
                    if (posMines.length == n - marks && posMines.length != 0) {
                        for (let k = 0; k < posMines.length; k++) {
                            let x = posMines[k][0];
                            let y = posMines[k][1];
                            click(x, y, "right");
                            clicked = true;
                        }
                        return;
                    }

                    //If there are no mines left, every cell is not a mine
                    if (n - marks == 0 && posMines.length != 0) {
                        for (let k = 0; k < posMines.length; k++) {
                            let x = posMines[k][0];
                            let y = posMines[k][1];
                            click(x, y, "left");
                            clicked = true;
                        }
                        return;
                    }

                }
            }
        }
        //Step 2: If nothing happend, use probability evaluation method
        let evalCells = [];
        //For every cell that could be a mine, and we have info about, evaluate it
        //and find minimun probability
        let min = 10000;
        for (let i = 0; i < posMines2.length; i++) {
            let x = posMines2[i][0];
            let y = posMines2[i][1];
            let prob = evaluateCell(x, y);
            evalCells.push([x, y, prob]);
            if (prob < min) {
                min = prob;
            }
        }
        //Pick randomnly the ones with lowest probability of being a mine
        let choices = [];
        for (let i = 0; i < evalCells.length; i++) {
            let x = evalCells[i][0];
            let y = evalCells[i][1];
            if (evalCells[i][2] == min) {
                choices.push([x, y]);
            }
        }
        let chosen = random(choices);
        if (chosen) {
            click(chosen[0], chosen[1], "left");
        } else {
            let lefts = [];
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (!grid[i][j].clicked && !grid[i][j].marked) { lefts.push([j, i]) }
                }
            }
            chosen = random(lefts);
            click(chosen[0], chosen[1], "left");
        }
        console.log("Chosed randomly", chosen);
        // if (gameover) {
        //     console.log("Wrong choice", chosen);
        // }
    }
}

function alredyThere(array, content) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == content[0] && array[i][1] == content[1]) {
            return true;
        }
    }
    return false;
}

function evaluateCell(i, j) {
    let probability = 0;
    let possibles = dimePos(i, j);
    for (let k = 0; k < possibles.length; k++) {
        let x = possibles[k][0];
        let y = possibles[k][1];
        //If  vissible  and   is  a number
        if (grid[y][x].clicked) {
            let inf = evaluateNumber(x, y);
            let content = inf[0];
            let n = inf[1];
            let marks = inf[2];
            probability += (content - marks) / (n - marks);
        }
    }
    return probability;
}

function evaluateNumber(i, j) {
    let content = grid[j][i].content;
    let n = 0;
    let marks = 0;
    let possibles = dimePos(i, j);
    //For every neighbour
    for (let k = 0; k < possibles.length; k++) {
        let x = possibles[k][0];
        let y = possibles[k][1];
        //If could be a mine
        if (!grid[y][x].clicked) {
            n++;
        }
        //If marked
        if (grid[y][x].marked) {
            marks++;
        }
    }
    return [content, n, marks];
}