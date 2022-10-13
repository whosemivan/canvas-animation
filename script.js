const graph = document.querySelector(".graph");
const graphBox = graph.parentElement.getBoundingClientRect();

console.log(graphBox);

graph.width = graphBox.width;
graph.height = graphBox.height;

const graphCenterX = Math.floor(graphBox.width / 2),
graphCenterY = Math.floor(graphBox.height / 2);

console.log(graphCenterX);
console.log(graphCenterY);


const gCtx = graph.getContext("2d");
gCtx.moveTo(0, graphCenterY);
gCtx.lineTo(graphBox.width, graphCenterY);
gCtx.moveTo(graphCenterX, 0);
gCtx.lineTo(graphCenterX, graphBox.height);
gCtx.stroke();

class Point {
    constructor(coordX, coordY) {
        this.x = coordX;
        this.y = coordY;
        this.color = "black";
    }

    changeColor(color) {
        this.color = color;
    }
};

const A = new Point(0, 0);

const getNumber = (max, min = 0) => Math.floor(Math.random() * (max-min) + min);

class Draw {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.scale = 11;
    }

    get color() {
        return `rgb(${getNumber(256)}, ${getNumber(256)}, ${getNumber(256)})`
    }

    set cx(cord) {
        this.x = Math.floor(cord / this.scale);
    }

    set cy(cord) {
        this.y = Math.floor(cord / this.scale);
    }


    drawSquare(p) {
        let scale = this.scale;
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color || "black";
        this.ctx.fillRect(((p.x + this.x) * scale) - scale / 2, (p.y + this.y) * scale - scale / 2, scale, scale);
        this.ctx.closePath();
    }

    zoom(n) {
        this.scale += n * 2;
    }

    drawPoint(p) {
        let scale = this.scale;
        this.ctx.beginPath();
        this.ctx.fillStyle = p.color || "black";
        this.ctx.arc((p.x + this.x) * scale, (p.y + this.y) * scale, scale, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

const g = new Draw(gCtx);
g.zoom(-2);
g.cx = graphCenterX;
g.cy = graphCenterY;

A.changeColor(g.color);
g.drawPoint(A);

let points = [], quantity = 20;

while (quantity--) {
    points.push(new Point(getNumber(graphCenterX / 10, -graphCenterX / 10), getNumber(graphCenterY / 10, -graphCenterY / 10)));
}

const colors = [g.color, g.color, g.color, g.color];

for (let i = 0; i < points.length; i++) {
    let p = points[i];
    switch(true) {
        case p.x > 0 && p.y > 0: p.changeColor(colors[0]); break;
        case p.x > 0: p.changeColor(colors[1]); break;
        case p.y > 0: p.changeColor(colors[2]); break;
        case p.x < 0: p.changeColor(colors[3]); break;
    }
    g.drawPoint(points[i]);
}