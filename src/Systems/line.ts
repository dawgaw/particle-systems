import { Spring } from "../spring";
import { ParticleSystem } from "./ParticleSystem";
import Vec from "victor";
import { Particle } from "../particle";

export class Line extends ParticleSystem {
	constructor(private count: number, private spacing: number, k: number = 0.01) {
		super()
		for (let j = 0; j < this.count; j++) {
			this.particles.push(new Particle(new Vec(window.innerWidth / 2, j * spacing), 5, 1, j != 0))
			if (j) {
				this.springs.push(new Spring(k, spacing, this.particles[j - 1], this.particles[j]))
			}
		}
	}
	draw(ctx: CanvasRenderingContext2D, beizer: boolean = false) {
		if (!beizer) {
			super.draw(ctx)
		} else {
			ctx.strokeStyle = "blue"
			ctx.lineWidth = 5
			ctx.beginPath();

			ctx.moveTo(this.particles[0].pos.x, this.particles[0].pos.y);
			for (let i = 1; i < this.particles.length - 2; i++) {
				var xc = (this.particles[i].pos.x + this.particles[i + 1].pos.x) / 2;
				var yc = (this.particles[i].pos.y + this.particles[i + 1].pos.y) / 2;
				ctx.quadraticCurveTo(this.particles[i].pos.x, this.particles[i].pos.y, xc, yc);
			}
			ctx.quadraticCurveTo(this.particles.at(-2).pos.x, this.particles.at(-2).pos.y, this.particles.at(-1).pos.x, this.particles.at(-1).pos.y);
			ctx.stroke()
		}
	}
}