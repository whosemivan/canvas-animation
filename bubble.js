class Bubble {
    constructor(c) {
        this.canvas = c;
        this.getCanvasSize();
        this.init();
    }
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }
    init() {
        this.size = getNumber(4, 1);
        this.translateX = getNumber(this.canvasWidth);
        this.translateY = getNumber(this.canvasHeight);
        this.moveY = getNumber(10, 1) / 20;
    }
    move() {
        this.translateY -= this.moveY;
        if (this.translateY < 0) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}

class CanvasBg {
    constructor(el) {
        this.canvas = el;
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }
    setSize() {
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr, this.ctx);
    }
    generateBubbles(n = 0) {
        this.bubbles = [];

        for (let i = 0; i < n; i++) {
            this.bubbles.push(new Bubble(this.canvas));
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.bubbles.forEach(b => {
            b.move();
            this.ctx.translate(b.translateX, b.translateY);
            this.ctx.beginPath();
            this.ctx.strokeStyle = b.color;
            this.ctx.arc(0, 0, b.size, 0, Math.PI * 2);
            this.ctx.fillStyle = "blue";
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
        });
        requestAnimationFrame(this.animate.bind(this))
    }
    start() {
        this.setSize();
        this.generateBubbles(20);
        this.animate();
    }
}

const c = new CanvasBg(document.querySelector(".animate"));
c.start();