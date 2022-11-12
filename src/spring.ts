import Vec from "victor";
import { Particle } from "./particle";
export class Spring {

	constructor(private k: number, private length: number, private a: Particle, private b: Particle) { }

	draw(ctx = new CanvasRenderingContext2D()) {
		ctx.strokeStyle = "blue"
		ctx.lineWidth = 5
		ctx.beginPath()
		ctx.moveTo(this.a.pos.x, this.a.pos.y)
		ctx.lineTo(this.b.pos.x, this.b.pos.y)
		ctx.stroke()
	}
	update() {
		let distV = this.a.pos.clone().subtract(this.b.pos);
		let dist = distV.length();
		let force = distV.normalize().multiplyScalar((dist - this.length) * this.k / 2)
		this.b.addForce(force)
		this.a.addForce(force.multiplyScalar(-1))
	}
}