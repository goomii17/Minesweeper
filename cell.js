class cell {
    constructor(x, y, s) {
        this.x = x + 2;
        this.y = y + 2;
        this.s = s - 4;
        this.clicked = false;
        this.content = 0;
        this.marked = false;
        this.show = false;
        this.face = false;
    }
    draw() {
        noFill();
        strokeWeight(1);
        if (this.show) {
            if (this.content == -1) {
                image(bomb, this.x, this.y, this.s, this.s);
            }
            if (this.content > 0) {
                image(numbrs[this.content - 1], this.x, this.y, this.s, this.s);
            }
        } else if (!this.face) {
            if (!this.clicked) {
                if (this.marked) {
                    image(flag, this.x, this.y, this.s, this.s);
                } else {
                    image(empty, this.x, this.y, this.s, this.s);
                }
            } else {
                if (this.content == -1) {
                    image(bomb, this.x, this.y, this.s, this.s);
                }
                if (this.content > 0) {
                    image(numbrs[this.content - 1], this.x, this.y, this.s, this.s);
                }
            }
        } else {
            image(face, this.x, this.y, this.s, this.s);
        }
    }
}