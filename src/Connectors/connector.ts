import { Particle } from "../particle";
export abstract class Connector {

	constructor(protected a: Particle, protected b: Particle) { }

	draw(ctx = new CanvasRenderingContext2D()) {
		ctx.strokeStyle = "blue"
		ctx.lineWidth = 5
		ctx.beginPath()
		ctx.moveTo(this.a.pos.x, this.a.pos.y)
		ctx.lineTo(this.b.pos.x, this.b.pos.y)
		ctx.stroke()
	}

	abstract update(): void;
}