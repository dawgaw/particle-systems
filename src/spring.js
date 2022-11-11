import Vec from "victor";
import { Particle } from "./particle";
export class Spring {
	constructor(k, length, a = new Particle(), b = new Particle()) {
		this.k = k
		this.length = length
		this.a = a
		this.b = b
	}
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
		let force = distV.normalize().multiplyScalar((dist - this.length) * this.k)
		this.b.addForce(force)
		this.a.addForce(force.multiplyScalar(-1))
	}
}