import Vec from "victor";
import { Cloth } from "./Systems/cloth.js";
import { Line } from "./Systems/line.js";
import { Particle } from "./particle.js"
import { ParticleSystem } from "./Systems/ParticleSystem.js";
import { DrawMethods } from "./DrawMethods.js";

export class Simulation {
	private ctx: CanvasRenderingContext2D
	constructor(private particleSystem: ParticleSystem, private drawMethod: DrawMethods, private gravity: Vec, private canvas: HTMLCanvasElement, private friction: number) {
		this.ctx = this.canvas.getContext("2d");
		this.run = this.run.bind(this)
	}
	enableSelecting() {
		let isMousePressed = false
		let selected: Particle | null = null;
		let selectedPhysics = false;

		this.canvas.onmouseup = () => { isMousePressed = false; selected.physics = selectedPhysics; selected = null }

		this.canvas.onmousemove = (ev) => {
			let mousePos = new Vec(ev.clientX, ev.clientY);
			if (isMousePressed && selected) {
				selected.pos = mousePos.clone();
				selected.prevPos = selected.pos.clone()
			}
		}
		this.canvas.onmousedown = (ev) => {
			isMousePressed = true;
			let mousePos = new Vec(ev.clientX, ev.clientY);
			for (const p of this.particleSystem.particles) {
				if (p.pos.clone().subtract(mousePos).length() < p.radius + 5) {
					selected = p;
					selectedPhysics = selected.physics;
					selected.physics = false
				}
			}
		}
	}
	run() {
		this.ctx.fillStyle = "black"
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		this.particleSystem.update(this.gravity, this.friction)
		if (this.drawMethod == DrawMethods.linesAndDots)
			this.particleSystem.draw(this.ctx)
		else
			this.particleSystem.drawBezier(this.ctx)

		requestAnimationFrame(this.run);
	}
}