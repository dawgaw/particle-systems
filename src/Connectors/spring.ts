import { Particle } from "../particle";
import { Connector } from "./connector";
export class Spring extends Connector {

	constructor(private k: number, private length: number, a: Particle, b: Particle) {
		super(a, b)
	}

	update() {
		let dist = this.a.pos.clone().subtract(this.b.pos);
		let force = dist.clone().normalize().multiplyScalar((dist.length() - this.length) * this.k / 2)
		this.b.addForce(force)
		this.a.addForce(force.multiplyScalar(-1))
	}
}