import Vec from "victor";
import { Cloth } from "./Systems/cloth.js";
import { Line } from "./Systems/line.js";
import { Particle } from "./particle.js"
import { ParticleSystem } from "./Systems/ParticleSystem.js";


const bezier = true;
const gravity = new Vec(0, 1)
const spacing = 50, k = 0.1
const count = 10;

const types = {
	"line": new Line(count, spacing, k),
	"cloth": new Cloth(count, spacing, k),
}

Particle.friction = 0.01;
let t: ParticleSystem = types.cloth;

let isMousePressed = false, mousePos = new Vec(0, 0);
let selected: Particle | null = null;


let canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.addEventListener("mouseup", () => { isMousePressed = false; selected = null })
canvas.addEventListener("mousemove", (ev) => {
	mousePos.x = ev.clientX; mousePos.y = ev.clientY;
	if (isMousePressed && selected) {
		selected.pos = mousePos.clone();
		selected.velocity.multiplyScalar(0);
	}
})
canvas.addEventListener("mousedown", (ev) => {
	isMousePressed = true;
	mousePos.x = ev.clientX; mousePos.y = ev.clientY
	for (const p of t.particles) {
		if (p.pos.clone().subtract(mousePos).length() < p.radius + 5) {
			selected = p;
		}
	}
})

let ctx = canvas.getContext("2d")!;

function animate() {
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	t.update(gravity)
	t.draw(ctx, bezier)

	requestAnimationFrame(animate);
}
animate();