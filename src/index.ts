import Vec from "victor";
import { Cloth } from "./Systems/cloth.js";
import { Line } from "./Systems/line.js";
import { Particle } from "./particle.js"
import { Spring } from "./spring.js";
import { ParticleSystem } from "./Systems/ParticleSystem.js";

let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let isMouse = false, mousePos = new Vec(0, 0);

let selected: Particle | null = null;


canvas.addEventListener("mouseup", (ev) => { isMouse = false; selected = null })
canvas.addEventListener("mousemove", (ev) => { mousePos.x = ev.clientX; mousePos.y = ev.clientY })


const gravity = new Vec(0, 1)
const spacing = 50, k = 0.1
const count = 10;
Particle.friction = 0.01;

const types = {
	"line": 1,
	"cloth": 2,

}
const type = types.cloth
const beizer = true;

let t: ParticleSystem;

switch (type) {
	case types.line:
		t = new Line(count, spacing, k)
		break;
	case types.cloth:
		t = new Cloth(count, spacing, k);
		break;
	default:
		break;
}

canvas.addEventListener("mousedown", (ev) => {
	isMouse = true;
	mousePos.x = ev.clientX; mousePos.y = ev.clientY

	for (const p of t.particles) {
		if (p.pos.clone().subtract(mousePos).length() < p.radius + 5)
			selected = p;
	}
})

function draw() {
	t.draw(ctx, beizer)
}
function update() {
	t.update(new Vec(0, 0.1))
	//t.update();
}

function animate() {
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	update()
	draw()
	if (isMouse && selected) {
		selected.pos = mousePos.clone();
		selected.velocity.multiplyScalar(0);
	}
	requestAnimationFrame(animate);
}
animate();