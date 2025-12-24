const canvas = document.getElementById("flame-canvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "assets/calculatorbackground.png.png";

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.s = Math.random() * 4 + 1;
    this.v = Math.random() * 2 + 1;
    this.a = 1;
  }
  update() {
    this.y -= this.v;
    this.a -= 0.01;
    if (this.a <= 0) this.reset();
  }
  draw() {
    ctx.fillStyle = `rgba(255,120,0,${this.a})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 250 }, () => new Particle());

function animate() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

bg.onload = animate;
