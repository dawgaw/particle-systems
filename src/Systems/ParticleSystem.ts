import { Particle } from "../particle";
import { Spring } from "../spring";
import Vec from "victor";

export class ParticleSystem {
	particles: Particle[] = []
	springs: Spring[] = []
	draw(ctx: CanvasRenderingContext2D, beizer: boolean = false) {
		for (const i of this.springs) {
			i.draw(ctx);
		}
		for (const i of this.particles) {
			i.draw(ctx);
		}


	}
	update(gravity = new Vec(0, 0)) {
		for (const i of this.particles) {
			if (i.physics)
				i.acceleration.add(gravity)
			i.update()
		}
		for (const i of this.springs) {
			i.update()
		}
	}
}