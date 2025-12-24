const canvas = document.getElementById("flame-canvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Load background image
const bgImage = new Image();
bgImage.src = 'assets/calculatorbackground.png.png';

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 100;
    this.size = Math.random() * 5 + 2;
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.alpha = 1;
    this.color = `rgba(255,${Math.floor(Math.random()*100)},0,${this.alpha})`;
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    this.alpha -= 0.01;
    if(this.alpha <= 0 || this.y < 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const particles = [];
for(let i=0;i<200;i++) particles.push(new Particle());

function animate() {
  // Draw background image
  ctx.drawImage(bgImage, 0, 0, width, height);

  // Overlay semi-transparent black to make calculator stand out
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0,0,width,height);

  // Draw flame particles
  particles.forEach(p => { p.update(); p.draw(); });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

bgImage.onload = () => {
  animate();
};
