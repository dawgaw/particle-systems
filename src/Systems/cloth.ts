import { Particle } from "../particle";
import { Spring } from "../Connectors/spring";
import { ParticleSystem } from "./ParticleSystem";
import Vec from "victor";

export class Cloth extends ParticleSystem {

	constructor(private count: number, private spacing: number, k: number = 0.01) {
		super()
		for (let i = 0; i < this.count; i++) {
			for (let j = 0; j < this.count; j++) {
				this.particles.push(new Particle(new Vec(window.innerWidth / 2 - this.count * spacing / 2 + j * spacing, i * spacing), 5, 1, i != 0))
				if (j) {
					this.connectors.push(new Spring(k, spacing, this.particles[i * this.count + j - 1], this.particles[i * this.count + j]))
				}
			}
			if (i) {
				for (let j = 0; j < this.count; j++) {
					this.connectors.push(new Spring(k, spacing, this.particles[(i - 1) * this.count + j], this.particles[i * this.count + j]))
				}
			}
		}
	}
	drawBezier(ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = "blue"
		ctx.lineWidth = 5

		ctx.beginPath();
		for (let i = 0; i < this.count; i++) {
			ctx.moveTo(this.particles[i * this.count].pos.x, this.particles[i * this.count].pos.y);
			for (let j = 1; j < this.count - 2; j++) {
				let cur = this.particles[i * this.count + j].pos;
				let next = this.particles[i * this.count + j + 1].pos;
				let c = cur.clone().add(next).divideScalar(2);
				ctx.quadraticCurveTo(cur.x, cur.y, c.x, c.y);
			}
			ctx.quadraticCurveTo(this.particles[(i + 1) * this.count - 2].pos.x, this.particles[(i + 1) * this.count - 2].pos.y, this.particles[(i + 1) * this.count - 1].pos.x, this.particles[(i + 1) * this.count - 1].pos.y);

			ctx.moveTo(this.particles[i].pos.x, this.particles[0].pos.y);
			for (let j = 1; j < this.count - 2; j++) {
				let cur = this.particles[i + this.count * j].pos;
				let next = this.particles[i + this.count * (j + 1)].pos;
				let c = cur.clone().add(next).divideScalar(2);
				ctx.quadraticCurveTo(cur.x, cur.y, c.x, c.y);
			}
			ctx.quadraticCurveTo(this.particles[(this.count - 2) * this.count + i].pos.x, this.particles[(this.count - 2) * this.count + i].pos.y, this.particles[(this.count - 1) * this.count + i].pos.x, this.particles[(this.count - 1) * this.count + i].pos.y);
		}
		ctx.stroke()
	}
}