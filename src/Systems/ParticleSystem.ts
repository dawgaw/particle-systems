import { Particle } from "../particle";
import { Spring } from "../Connectors/spring";
import Vec from "victor";
import { Connector } from "../Connectors/connector";
import { DrawMethods } from "../DrawMethods";

export abstract class ParticleSystem {
	particles: Particle[] = []
	connectors: Connector[] = []

	abstract drawBezier(ctx: CanvasRenderingContext2D)

	draw(ctx: CanvasRenderingContext2D) {
		for (const i of this.connectors) {
			i.draw(ctx);
		}
		for (const i of this.particles) {
			i.draw(ctx);
		}
	}

	update(gravity: Vec, friction: number) {
		for (const i of this.connectors) {
			i.update()
		}
		for (const i of this.particles) {
			if (i.physics)
				i.accelerate(gravity)
			i.update(1, friction)
		}

	}
}