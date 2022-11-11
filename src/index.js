import Vec from "victor";
import { Particle } from "./particle.js"
import { Spring } from "./spring.js";

let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let isMouse = false, mousePos = new Vec(0, 0);

let particles = []
let springs = []
let selected = null


canvas.addEventListener("mousedown", (ev) => {
	isMouse = true;
	mousePos.x = ev.clientX; mousePos.y = ev.clientY

	for (const p of particles) {
		if (p.pos.clone().subtract(mousePos).length() < p.radius + 5)
			selected = p;
	}
})
canvas.addEventListener("mouseup", (ev) => { isMouse = false; selected = null })
canvas.addEventListener("mousemove", (ev) => { mousePos.x = ev.clientX; mousePos.y = ev.clientY })


const gravity = new Vec(0, 0.2)
const spacing = 50, k = 0.04
const count = 10;
Particle.friction = 0.01;

const types = {
	"line": 1,
	"cloth": 2,
}
const type = types.line
const beizer = true;

if (type == types["line"]) {
	for (let j = 0; j < count; j++) {
		particles.push(new Particle(new Vec(window.innerWidth / 2, j * spacing), 5, j != 0))
		if (j) {
			springs.push(new Spring(k, spacing, particles[j - 1], particles[+ j]))
		}
	}
}
else {
	for (let i = 0; i < count; i++) {

		for (let j = 0; j < count; j++) {
			particles.push(new Particle(new Vec(window.innerWidth / 2 - count * spacing / 2 + j * spacing, i * spacing), 5, i != 0))
			if (j) {
				springs.push(new Spring(k, spacing, particles[i * count + j - 1], particles[i * count + j]))
			}
		}
		if (i) {
			for (let j = 0; j < count; j++) {
				springs.push(new Spring(k, spacing, particles[(i - 1) * count + j], particles[i * count + j]))
			}
		}
	}
}
function draw() {
	if (beizer) {
		ctx.strokeStyle = "blue"
		ctx.lineWidth = 5
		ctx.beginPath();

		if (type == types.cloth) {
			for (let i = 0; i < count; i++) {
				ctx.moveTo(particles[i * count].pos.x, particles[i * count].pos.y);
				for (let j = 1; j < count - 2; j++) {
					let cur = particles[i * count + j].pos;
					let next = particles[i * count + j + 1].pos;
					let c = cur.clone().add(next).divideScalar(2);
					ctx.quadraticCurveTo(cur.x, cur.y, c.x, c.y);
				}
				ctx.quadraticCurveTo(particles[(i + 1) * count - 2].pos.x, particles[(i + 1) * count - 2].pos.y, particles[(i + 1) * count - 1].pos.x, particles[(i + 1) * count - 1].pos.y);

				ctx.moveTo(particles[i].pos.x, particles[0].pos.y);
				for (let j = 1; j < count - 2; j++) {
					let cur = particles[i + count * j].pos;
					let next = particles[i + count * (j + 1)].pos;
					let c = cur.clone().add(next).divideScalar(2);
					ctx.quadraticCurveTo(cur.x, cur.y, c.x, c.y);
				}
				ctx.quadraticCurveTo(particles[(count - 2) * count + i].pos.x, particles[(count - 2) * count + i].pos.y, particles[(count - 1) * count + i].pos.x, particles[(count - 1) * count + i].pos.y);
			}
		} else {
			ctx.moveTo(particles[0].pos.x, particles[0].pos.y);
			for (let i = 1; i < particles.length - 2; i++) {
				var xc = (particles[i].pos.x + particles[i + 1].pos.x) / 2;
				var yc = (particles[i].pos.y + particles[i + 1].pos.y) / 2;
				ctx.quadraticCurveTo(particles[i].pos.x, particles[i].pos.y, xc, yc);
			}
			ctx.quadraticCurveTo(particles.at(-2).pos.x, particles.at(-2).pos.y, particles.at(-1).pos.x, particles.at(-1).pos.y);
			ctx.stroke()

		}
	} else {
		for (const i of springs) {
			i.draw(ctx)
		}
		for (const i of particles) {
			i.draw(ctx)
		}
	}
}
function update() {
	for (const i of springs) {
		i.update()
	}
	for (const i of particles) {
		i.update()
		i.addForce(gravity)

	}
}

function animate() {
	ctx.fillStyle = "black"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	update()
	draw()
	if (isMouse && selected) {
		selected.pos = mousePos.clone();
		selected.v.multiplyScalar(0);
	}
	requestAnimationFrame(animate);
}
animate();