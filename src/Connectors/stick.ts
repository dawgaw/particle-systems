import { Particle } from "../particle";
import { Connector } from "./connector";
export class Stick extends Connector {
	private length: number;
	constructor(a: Particle, b: Particle) {
		super(a, b)
		this.length = a.pos.clone().subtract(b.pos).length()
	}
	update() {
		let dist = this.a.pos.clone().subtract(this.b.pos);
		let offset = dist.clone().normalize().multiplyScalar(this.length).subtract(dist);

		if (this.a.physics && this.b.physics)
			offset.divideScalar(2)

		if (this.a.physics)
			this.a.pos.add(offset)
		if (this.b.physics)
			this.b.pos.add(offset.multiplyScalar(-1))

	}
}